import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { User, Settings, LogOut, Award, BookOpen, Clock, Bell, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import { router } from 'expo-router';
import LoadingIndicator from '../../components/LoadingIndicator';
import { tr } from '../../localization/translations';
import { useEffect } from 'react';

export default function ProfileScreen() {
  const { user, logout, isLoading, isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading]);

  const handleLogout = async () => {
    Alert.alert(
      tr('logoutConfirmTitle'),
      tr('logoutConfirmMessage'),
      [
        {
          text: tr('cancel'),
          style: 'cancel'
        },
        {
          text: tr('logout'),
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // Force navigation to login screen
              router.replace('/');
            } catch (error) {
              console.error('Logout error:', error);
              // Force navigation to login screen even if logout fails
              router.replace('/');
            }
          }
        }
      ]
    );
  };

  if (isLoading) {
    return <LoadingIndicator fullScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{tr('profile')}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.userName}>{user?.name || 'Adam Wolf'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>{tr('tests')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>82%</Text>
              <Text style={styles.statLabel}>{tr('avgScore')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>68%</Text>
              <Text style={styles.statLabel}>{tr('complete')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{tr('account')}</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/profile/personal-info')}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#e0f2fe' }]}>
              <User size={20} color="#0284c7" />
            </View>
            <Text style={styles.menuText}>{tr('personalInformation')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#dcfce7' }]}>
              <Award size={20} color="#16a34a" />
            </View>
            <Text style={styles.menuText}>{tr('achievements')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#fef3c7' }]}>
              <BookOpen size={20} color="#d97706" />
            </View>
            <Text style={styles.menuText}>{tr('learningHistory')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#f3e8ff' }]}>
              <Clock size={20} color="#9333ea" />
            </View>
            <Text style={styles.menuText}>{tr('studySchedule')}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{tr('preferences')}</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#fee2e2' }]}>
              <Bell size={20} color="#dc2626" />
            </View>
            <Text style={styles.menuText}>{tr('notifications')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#e0f2fe' }]}>
              <Shield size={20} color="#0284c7" />
            </View>
            <Text style={styles.menuText}>{tr('privacySecurity')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#f1f5f9' }]}>
              <HelpCircle size={20} color="#64748b" />
            </View>
            <Text style={styles.menuText}>{tr('helpSupport')}</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>{tr('logout')}</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>{tr('version')} 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#e2e8f0',
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#0f172a',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  versionText: {
    fontSize: 14,
    color: '#94a3b8',
  }
});