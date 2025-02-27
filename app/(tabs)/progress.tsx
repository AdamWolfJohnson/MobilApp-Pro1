import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { ChartBar as BarChart, Calendar, TrendingUp, Award, Clock, BookOpen, ArrowRight } from 'lucide-react-native';
import { QUESTION_CATEGORIES } from '../../data/questions';

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');
  
  // Mock data for progress statistics
  const progressStats = {
    testsCompleted: 12,
    questionsAnswered: 120,
    correctAnswers: 98,
    averageScore: 82,
    studyTime: '8 saat 45 dakika',
    streak: 5,
  };
  
  // Mock data for category progress
  const categoryProgress = QUESTION_CATEGORIES.map(category => ({
    ...category,
    progress: Math.floor(Math.random() * 100),
    questionsAnswered: Math.floor(Math.random() * 50) + 10,
    correctAnswers: Math.floor(Math.random() * 40) + 5,
  }));
  
  // Mock data for recent activity
  const recentActivity = [
    { 
      id: 1, 
      type: 'test', 
      title: 'Trafik Kuralları Testi', 
      date: '2 gün önce', 
      score: 85, 
      questionsCount: 10,
      correctCount: 8,
    },
    { 
      id: 2, 
      type: 'practice', 
      title: 'Trafik İşaretleri Pratik', 
      date: '4 gün önce', 
      duration: '25 dakika',
      questionsCount: 15,
    },
    { 
      id: 3, 
      type: 'test', 
      title: 'İlk Yardım Testi', 
      date: '1 hafta önce', 
      score: 70, 
      questionsCount: 10,
      correctCount: 7,
    },
  ];
  
  // Mock data for performance chart
  const performanceData = [
    { date: 'Pzt', score: 65 },
    { date: 'Sal', score: 70 },
    { date: 'Çar', score: 75 },
    { date: 'Per', score: 68 },
    { date: 'Cum', score: 82 },
    { date: 'Cmt', score: 90 },
    { date: 'Paz', score: 85 },
  ];
  
  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      <TouchableOpacity
        style={[
          styles.periodOption,
          selectedPeriod === 'week' && styles.periodOptionActive
        ]}
        onPress={() => setSelectedPeriod('week')}
      >
        <Text
          style={[
            styles.periodOptionText,
            selectedPeriod === 'week' && styles.periodOptionTextActive
          ]}
        >
          Bu Hafta
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.periodOption,
          selectedPeriod === 'month' && styles.periodOptionActive
        ]}
        onPress={() => setSelectedPeriod('month')}
      >
        <Text
          style={[
            styles.periodOptionText,
            selectedPeriod === 'month' && styles.periodOptionTextActive
          ]}
        >
          Bu Ay
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.periodOption,
          selectedPeriod === 'all' && styles.periodOptionActive
        ]}
        onPress={() => setSelectedPeriod('all')}
      >
        <Text
          style={[
            styles.periodOptionText,
            selectedPeriod === 'all' && styles.periodOptionTextActive
          ]}
        >
          Tümü
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderPerformanceChart = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Performans Grafiği</Text>
        <TouchableOpacity style={styles.chartFilterButton}>
          <Calendar size={16} color="#64748b" />
          <Text style={styles.chartFilterText}>Filtrele</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.chart}>
        <View style={styles.chartYAxis}>
          <Text style={styles.chartAxisLabel}>100%</Text>
          <Text style={styles.chartAxisLabel}>75%</Text>
          <Text style={styles.chartAxisLabel}>50%</Text>
          <Text style={styles.chartAxisLabel}>25%</Text>
          <Text style={styles.chartAxisLabel}>0%</Text>
        </View>
        
        <View style={styles.chartContent}>
          {performanceData.map((item, index) => (
            <View key={index} style={styles.chartBarContainer}>
              <View style={styles.chartBarWrapper}>
                <View 
                  style={[
                    styles.chartBar, 
                    { height: `${item.score}%` },
                    item.score > 80 ? styles.chartBarHigh : 
                    item.score > 60 ? styles.chartBarMedium : 
                    styles.chartBarLow
                  ]} 
                />
              </View>
              <Text style={styles.chartXLabel}>{item.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>İlerlemeniz</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderPeriodSelector()}
        
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#eff6ff' }]}>
                <BookOpen size={20} color="#3b82f6" />
              </View>
              <Text style={styles.statValue}>{progressStats.testsCompleted}</Text>
              <Text style={styles.statLabel}>Tamamlanan Test</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#f0fdf4' }]}>
                <TrendingUp size={20} color="#16a34a" />
              </View>
              <Text style={styles.statValue}>{progressStats.averageScore}%</Text>
              <Text style={styles.statLabel}>Ortalama Puan</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#fef3c7' }]}>
                <Clock size={20} color="#d97706" />
              </View>
              <Text style={styles.statValue}>{progressStats.studyTime}</Text>
              <Text style={styles.statLabel}>Çalışma Süresi</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#f3e8ff' }]}>
                <Award size={20} color="#9333ea" />
              </View>
              <Text style={styles.statValue}>{progressStats.streak} gün</Text>
              <Text style={styles.statLabel}>Çalışma Serisi</Text>
            </View>
          </View>
        </View>
        
        {renderPerformanceChart()}
        
        <View style={styles.categoryProgressContainer}>
          <Text style={styles.sectionTitle}>Kategori İlerlemesi</Text>
          
          {categoryProgress.map((category) => (
            <View key={category.id} style={styles.categoryProgressCard}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTitleContainer}>
                  <View 
                    style={[
                      styles.categoryIcon, 
                      { backgroundColor: `${category.color}20` }
                    ]}
                  >
                    <BookOpen size={18} color={category.color} />
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </View>
                <Text style={styles.categoryProgressText}>{category.progress}%</Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${category.progress}%`, backgroundColor: category.color }
                  ]} 
                />
              </View>
              
              <View style={styles.categoryStats}>
                <Text style={styles.categoryStatText}>
                  {category.questionsAnswered} soru cevaplandı
                </Text>
                <Text style={styles.categoryStatText}>
                  {category.correctAnswers} doğru cevap
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.recentActivityContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Tümünü Gör</Text>
              <ArrowRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityIconContainer}>
                {activity.type === 'test' ? (
                  <BarChart size={20} color="#3b82f6" />
                ) : (
                  <BookOpen size={20} color="#16a34a" />
                )}
              </View>
              
              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
                
                <View style={styles.activityDetails}>
                  {activity.type === 'test' ? (
                    <>
                      <Text style={styles.activityDetailText}>
                        Puan: <Text style={styles.activityHighlight}>{activity.score}%</Text>
                      </Text>
                      <Text style={styles.activityDetailText}>
                        {activity.correctCount}/{activity.questionsCount} doğru
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.activityDetailText}>
                        Süre: <Text style={styles.activityHighlight}>{activity.duration}</Text>
                      </Text>
                      <Text style={styles.activityDetailText}>
                        {activity.questionsCount} soru çözüldü
                      </Text>
                    </>
                  )}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodOptionActive: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  periodOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  periodOptionTextActive: {
    color: '#0f172a',
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
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
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
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
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  chartFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartFilterText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  chart: {
    flexDirection: 'row',
    height: 200,
    marginTop: 8,
  },
  chartYAxis: {
    width: 40,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  chartAxisLabel: {
    fontSize: 10,
    color: '#94a3b8',
  },
  chartContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarWrapper: {
    width: 20,
    height: 180,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartBarHigh: {
    backgroundColor: '#16a34a',
  },
  chartBarMedium: {
    backgroundColor: '#f59e0b',
  },
  chartBarLow: {
    backgroundColor: '#ef4444',
  },
  chartXLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  categoryProgressContainer: {
    marginBottom: 24,
  },
  categoryProgressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  categoryProgressText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  categoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryStatText: {
    fontSize: 12,
    color: '#64748b',
  },
  recentActivityContainer: {
    marginBottom: 24,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
    marginRight: 4,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  activityDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityDetailText: {
    fontSize: 13,
    color: '#64748b',
  },
  activityHighlight: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});