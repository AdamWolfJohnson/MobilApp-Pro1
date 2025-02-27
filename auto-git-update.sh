#!/bin/bash

# Auto Git Update Script
# This script automatically commits and pushes changes to your Git repository

# Configuration
BRANCH="main"
COMMIT_MESSAGE="Auto-update: Project changes"

# Check if there are changes to commit
if [ -z "$(git status --porcelain)" ]; then
  echo "✅ No changes detected. Repository is up to date."
  exit 0
fi

echo "🔄 Changes detected, updating repository..."

# Add all changes
echo "📦 Adding changes..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# Check if remote is configured
if git remote | grep -q "origin"; then
  # Push changes
  echo "☁️ Pushing to remote repository..."
  git push -u origin $BRANCH
  echo "✅ Successfully pushed changes to remote repository!"
else
  echo "⚠️ No remote configured. Changes committed locally only."
  echo "💡 To push to a remote repository, run:"
  echo "    git remote add origin <your-repository-url>"
  echo "    git push -u origin $BRANCH"
fi