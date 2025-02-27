import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Play, BookOpen, Award, CircleAlert as AlertCircle, TrendingUp, Calendar, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { tr } from '../../localization/translations';

export default function HomeScreen() {
  const userName = "Adam Wolf";
  const completionRate = 68;
  const testsTaken = 12;
  const averageScore = 82;
  
  const categories = [
    { id: 1, title: 'Trafik Kuralları', icon: 'traffic-light', progress: 75, color: '#3b82f6' },
    { id: 2, title: 'Trafik İşaretleri', icon: 'sign-post', progress: 90, color: '#10b981' },
    { id: 3, title: 'İlk Yardım', icon: 'first-aid', progress: 45, color: '#ef4444' },
    { id: 4, title: 'Araç Bakımı', icon: 'car', progress: 30, color: '#f59e0b' },
  ];
  
  const recentTests = [
    { id: 1, title: 'Trafik Kuralları Testi', score: 85, date: '2 gün önce', areas: ['Geçiş Hakkı', 'Hız Limitleri'] },
    { id: 2, title: 'Trafik İşaretleri Testi', score: 92, date: '5 gün önce', areas: ['Uyarı İşaretleri'] },
  ];

  const navigateToProfile = () => {
    router.push('/(tabs)/profile');
  };

  const navigateToPractice = () => {
    router.push('/(tabs)/practice');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hoş geldiniz,</Text>
          <Text style={styles.userName}>{userName}!</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={navigateToProfile}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Progress Overview */}
        <View style={styles.progressContainer}>
          <Text style={styles.sectionTitle}>İlerlemeniz</Text>
          <View style={styles.progressCards}>
            <View style={styles.progressCard}>
              <View style={styles.progressIconContainer}>
                <TrendingUp size={20} color="#3b82f6" />
              </View>
              <Text style={styles.progressValue}>{completionRate}%</Text>
              <Text style={styles.progressLabel}>Tamamlanan</Text>
            </View>
            
            <View style={styles.progressCard}>
              <View style={styles.progressIconContainer}>
                <BookOpen size={20} color="#10b981" />
              </View>
              <Text style={styles.progressValue}>{testsTaken}</Text>
              <Text style={styles.progressLabel}>Test Sayısı</Text>
            </View>
            
            <View style={styles.progressCard}>
              <View style={styles.progressIconContainer}>
                <Award size={20} color="#f59e0b" />
              </View>
              <Text style={styles.progressValue}>{averageScore}%</Text>
              <Text style={styles.progressLabel}>Ort. Puan</Text>
            </View>
          </View>
        </View>
        
        {/* Quick Start */}
        <TouchableOpacity style={styles.quickStartButton} onPress={navigateToPractice}>
          <Play size={24} color="#fff" />
          <Text style={styles.quickStartText}>Pratik Testine Başla</Text>
        </TouchableOpacity>
        
        {/* Daily Challenge */}
        <View style={styles.dailyChallengeContainer}>
          <View style={styles.dailyChallengeHeader}>
            <Text style={styles.sectionTitle}>Günlük Meydan Okuma</Text>
            <Calendar size={20} color="#3b82f6" />
          </View>
          <View style={styles.dailyChallenge}>
            <View style={styles.dailyChallengeContent}>
              <AlertCircle size={24} color="#3b82f6" />
              <View style={styles.dailyChallengeTextContainer}>
                <Text style={styles.dailyChallengeTitle}>Günün Sorusu</Text>
                <Text style={styles.dailyChallengeDescription}>
                  Sarı trafik ışığına yaklaşırken ne yapmalısınız?
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.dailyChallengeButton} onPress={navigateToPractice}>
              <Text style={styles.dailyChallengeButtonText}>Meydan Okumayı Kabul Et</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Çalışma Kategorileri</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                onPress={navigateToPractice}
              >
                <View style={[styles.categoryIconContainer, { backgroundColor: `${category.color}20` }]}>
                  <BookOpen size={24} color={category.color} />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${category.progress}%`, backgroundColor: category.color }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>%{category.progress} Tamamlandı</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Recent Test Results */}
        <View style={styles.recentTestsContainer}>
          <Text style={styles.sectionTitle}>Son Test Sonuçları</Text>
          {recentTests.map((test) => (
            <View key={test.id} style={styles.testResultCard}>
              <View style={styles.testResultHeader}>
                <Text style={styles.testResultTitle}>{test.title}</Text>
                <Text style={styles.testResultDate}>{test.date}</Text>
              </View>
              <View style={styles.testResultContent}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreValue}>%{test.score}</Text>
                  <Text style={styles.scoreLabel}>Puan</Text>
                </View>
                <View style={styles.areasContainer}>
                  <Text style={styles.areasLabel}>Geliştirilmesi gereken alanlar:</Text>
                  {test.areas.map((area, index) => (
                    <View key={index} style={styles.areaItem}>
                      <CheckCircle2 size={16} color="#3b82f6" />
                      <Text style={styles.areaText}>{area}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
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
  scrollContent: {
    paddingBottom: 30,
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
  greeting: {
    fontSize: 16,
    color: '#64748b',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  progressContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  progressCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  progressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  quickStartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    height: 60,
    marginHorizontal: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  quickStartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  dailyChallengeContainer: {
    padding: 20,
  },
  dailyChallengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dailyChallenge: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  dailyChallengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dailyChallengeTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  dailyChallengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  dailyChallengeDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  dailyChallengeButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dailyChallengeButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  categoriesContainer: {
    padding: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: { backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
  },
  recentTestsContainer: {
    padding: 20,
  },
  testResultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  testResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  testResultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  testResultDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  testResultContent: {
    flexDirection: 'row',
  },
  scoreContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  areasContainer: {
    flex: 1,
  },
  areasLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  areaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  areaText: {
    fontSize: 14,
    color: '#0f172a',
    marginLeft: 8,
  },
});