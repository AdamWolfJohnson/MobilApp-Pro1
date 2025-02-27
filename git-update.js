// Git Auto-Update Script
// This script automatically commits and pushes changes to your Git repository

const { execSync } = require('child_process');

// Configuration
const REMOTE_URL = process.env.GIT_REMOTE_URL || 'https://github.com/AdamWolfJohnson/MobilApp-Pro1'; // Default to your repo
const BRANCH = process.env.GIT_BRANCH || 'main';     // Default branch name
const COMMIT_MESSAGE = process.env.GIT_COMMIT_MESSAGE || 'Auto-update: Project changes';

function runCommand(command) {
  try {
    console.log(`Running: ${command}`);
    return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return null;
  }
}

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8', stdio: 'pipe' });
    return status && status.trim().length > 0;
  } catch (error) {
    console.error('Error checking git status:', error.message);
    console.log('Checking if git is initialized...');
    
    try {
      execSync('git rev-parse --is-inside-work-tree', { encoding: 'utf8', stdio: 'pipe' });
    } catch (initError) {
      console.log('Git repository not initialized. Initializing...');
      runCommand('git init');
      return true; // Return true to proceed with initial commit
    }
    
    return false;
  }
}

function updateGit() {
  console.log('🔍 Checking for changes...');
  
  // Check if there are changes to commit
  if (!checkGitStatus()) {
    console.log('✅ No changes detected. Repository is up to date.');
    return;
  }
  
  console.log('🔄 Changes detected, updating repository...');
  
  // Add all changes
  console.log('📦 Adding changes...');
  runCommand('git add .');
  
  // Commit changes
  console.log('💾 Committing changes...');
  runCommand(`git commit -m "${COMMIT_MESSAGE}"`);
  
  // Check if remote URL is configured
  if (REMOTE_URL) {
    // Set remote if not already set
    try {
      const remotes = execSync('git remote', { encoding: 'utf8', stdio: 'pipe' });
      if (!remotes || !remotes.includes('origin')) {
        console.log('🔗 Setting up remote...');
        runCommand(`git remote add origin ${REMOTE_URL}`);
      } else {
        // Update remote URL to ensure it's correct
        console.log('🔄 Updating remote URL...');
        runCommand(`git remote set-url origin ${REMOTE_URL}`);
      }
      
      // Push changes
      console.log('☁️ Pushing to remote repository...');
      runCommand(`git push -u origin ${BRANCH}`);
      console.log('✅ Successfully pushed changes to remote repository!');
    } catch (error) {
      console.error('Error with remote operations:', error.message);
    }
  } else {
    console.log('⚠️ No remote URL configured. Changes committed locally only.');
    console.log('💡 To push to a remote repository, set the GIT_REMOTE_URL environment variable.');
    console.log('   You can do this by running:');
    console.log('   export GIT_REMOTE_URL="your-repository-url"');
    console.log('   before running this script.');
  }
}

// Run the update
updateGit();