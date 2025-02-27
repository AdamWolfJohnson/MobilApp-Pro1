import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { BookOpen, Filter, ArrowLeft, Award } from 'lucide-react-native';
import { getRandomQuestions, Question, QUESTION_CATEGORIES, QuestionCategory } from '../../data/questions';
import QuestionCard from '../../components/QuestionCard';
import QuizProgress from '../../components/QuizProgress';
import { router } from 'expo-router';

export default function PracticeScreen() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>();
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'all'>('all');

  // Load questions when component mounts
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = (category: QuestionCategory | 'all' = 'all') => {
    let loadedQuestions = getRandomQuestions(10);
    
    if (category !== 'all') {
      // Filter questions by category if a specific category is selected
      loadedQuestions = loadedQuestions.filter(q => q.category === category);
      
      // If not enough questions in the category, add more random ones
      if (loadedQuestions.length < 5) {
        const additionalQuestions = getRandomQuestions(10 - loadedQuestions.length)
          .filter(q => q.category !== category);
        loadedQuestions = [...loadedQuestions, ...additionalQuestions];
      }
    }
    
    setQuestions(loadedQuestions);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setSelectedOptionId(undefined);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const startQuiz = (category: QuestionCategory | 'all' = 'all') => {
    setSelectedCategory(category);
    loadQuestions(category);
    setQuizStarted(true);
  };

  const handleAnswer = (optionId: string) => {
    setSelectedOptionId(optionId);
    setShowResult(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    if (optionId === currentQuestion.correctOptionId) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(undefined);
      setShowResult(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    loadQuestions(selectedCategory);
    setQuizStarted(true);
    setQuizCompleted(false);
  };

  const exitQuiz = () => {
    Alert.alert(
      'Testi Sonlandır',
      'Bu testi sonlandırmak istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel'
        },
        {
          text: 'Çık',
          style: 'destructive',
          onPress: () => {
            setQuizStarted(false);
            setQuizCompleted(false);
          }
        }
      ]
    );
  };

  // Quiz selection screen
  if (!quizStarted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pratik Testleri</Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.quizTypeContainer}>
            <Text style={styles.sectionTitle}>Test Türünü Seçin</Text>
            
            <TouchableOpacity 
              style={styles.quizTypeCard}
              onPress={() => startQuiz('all')}
            >
              <View style={[styles.quizTypeIconContainer, { backgroundColor: '#eff6ff' }]}>
                <BookOpen size={24} color="#3b82f6" />
              </View>
              <View style={styles.quizTypeContent}>
                <Text style={styles.quizTypeTitle}>Karışık Test</Text>
                <Text style={styles.quizTypeDescription}>
                  Tüm kategorilerden rastgele sorular içeren bir test çözün.
                </Text>
              </View>
            </TouchableOpacity>
            
            {QUESTION_CATEGORIES.map((category) => (
              <TouchableOpacity 
                key={category.id}
                style={styles.quizTypeCard}
                onPress={() => startQuiz(category.id)}
              >
                <View 
                  style={[
                    styles.quizTypeIconContainer, 
                    { backgroundColor: `${category.color}20` }
                  ]}
                >
                  <BookOpen size={24} color={category.color} />
                </View>
                <View style={styles.quizTypeContent}>
                  <Text style={styles.quizTypeTitle}>{category.title}</Text>
                  <Text style={styles.quizTypeDescription}>
                    {category.title} ile ilgili sorulardan oluşan bir test çözün.
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.tipsContainer}>
            <Text style={styles.sectionTitle}>Test İpuçları</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>Zamanınızı İyi Kullanın</Text>
              <Text style={styles.tipText}>
                Her soruyu dikkatle okuyun ve acele etmeyin. Emin olmadığınız soruları işaretleyip daha sonra dönebilirsiniz.
              </Text>
            </View>
            
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>Eleme Yöntemi</Text>
              <Text style={styles.tipText}>
                Doğru cevabı bilmiyorsanız, kesinlikle yanlış olduğunu düşündüğünüz seçenekleri eleyerek ilerleyin.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Quiz completed screen
  if (quizCompleted) {
    const score = Math.round((correctAnswers / questions.length) * 100);
    let resultMessage = '';
    let resultColor = '';
    
    if (score >= 90) {
      resultMessage = 'Mükemmel! Harika bir sonuç!';
      resultColor = '#16a34a';
    } else if (score >= 70) {
      resultMessage = 'İyi iş! Biraz daha pratik yapabilirsiniz.';
      resultColor = '#3b82f6';
    } else if (score >= 50) {
      resultMessage = 'Ortalama. Daha fazla çalışmanız gerekiyor.';
      resultColor = '#f59e0b';
    } else {
      resultMessage = 'Daha fazla pratik yapmalısınız.';
      resultColor = '#dc2626';
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setQuizStarted(false)}
          >
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Test Sonuçları</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.resultContainer}>
            <View style={styles.resultScoreContainer}>
              <Award size={40} color="#3b82f6" />
              <Text style={styles.resultScoreText}>{score}%</Text>
              <Text style={[styles.resultMessage, { color: resultColor }]}>
                {resultMessage}
              </Text>
            </View>
            
            <View style={styles.resultStatsContainer}>
              <View style={styles.resultStatItem}>
                <Text style={styles.resultStatValue}>{questions.length}</Text>
                <Text style={styles.resultStatLabel}>Toplam Soru</Text>
              </View>
              
              <View style={styles.resultStatItem}>
                <Text style={styles.resultStatValue}>{correctAnswers}</Text>
                <Text style={styles.resultStatLabel}>Doğru Cevap</Text>
              </View>
              
              <View style={styles.resultStatItem}>
                <Text style={styles.resultStatValue}>{questions.length - correctAnswers}</Text>
                <Text style={styles.resultStatLabel}>Yanlış Cevap</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.restartButton}
              onPress={restartQuiz}
            >
              <Text style={styles.restartButtonText}>Yeniden Başlat</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.exitButton}
              onPress={() => setQuizStarted(false)}
            >
              <Text style={styles.exitButtonText}>Ana Menüye Dön</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.reviewContainer}>
            <Text style={styles.sectionTitle}>Sorular ve Cevaplar</Text>
            
            {questions.map((question, index) => (
              <View key={question.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewQuestionNumber}>Soru {index + 1}</Text>
                  {question.correctOptionId === question.options.find(
                    opt => opt.id === question.correctOptionId
                  )?.id ? (
                    <View style={styles.reviewCorrectBadge}>
                      <Text style={styles.reviewCorrectText}>Doğru</Text>
                    </View>
                  ) : (
                    <View style={styles.reviewIncorrectBadge}>
                      <Text style={styles.reviewIncorrectText}>Yanlış</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.reviewQuestionText}>{question.text}</Text>
                
                <View style={styles.reviewAnswerContainer}>
                  <Text style={styles.reviewAnswerLabel}>Doğru Cevap:</Text>
                  <Text style={styles.reviewAnswerText}>
                    {question.options.find(opt => opt.id === question.correctOptionId)?.text}
                  </Text>
                </View>
                
                <View style={styles.reviewExplanationContainer}>
                  <Text style={styles.reviewExplanationLabel}>Açıklama:</Text>
                  <Text style={styles.reviewExplanationText}>{question.explanation}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  // Active quiz screen
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={exitQuiz}
        >
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectedCategory === 'all' 
            ? 'Karışık Test' 
            : QUESTION_CATEGORIES.find(c => c.id === selectedCategory)?.title || 'Pratik Testi'}
        </Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <QuizProgress 
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
        />
        
        {questions.length > 0 && (
          <QuestionCard 
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            showResult={showResult}
            selectedOptionId={selectedOptionId}
          />
        )}
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  quizTypeContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  quizTypeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  quizTypeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  quizTypeContent: {
    flex: 1,
  },
  quizTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  quizTypeDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  tipsContainer: {
    marginBottom: 24,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  resultScoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultScoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#0f172a',
    marginVertical: 12,
  },
  resultMessage: {
    fontSize: 18,
    fontWeight: '600',
  },
  resultStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  resultStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  resultStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  resultStatLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  restartButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  exitButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewContainer: {
    marginBottom: 24,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewQuestionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  reviewCorrectBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewCorrectText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '600',
  },
  reviewIncorrectBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewIncorrectText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
  },
  reviewQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 16,
    lineHeight: 24,
  },
  reviewAnswerContainer: {
    marginBottom: 12,
  },
  reviewAnswerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  reviewAnswerText: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '500',
  },
  reviewExplanationContainer: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  reviewExplanationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  reviewExplanationText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
});