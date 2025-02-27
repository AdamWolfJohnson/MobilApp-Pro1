import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestion,
  totalQuestions,
  correctAnswers
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.progressInfo}>
        <Text style={styles.questionCounter}>
          Soru {currentQuestion}/{totalQuestions}
        </Text>
        <Text style={styles.scoreText}>
          Doğru: <Text style={styles.scoreValue}>{correctAnswers}</Text>
        </Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${progressPercentage}%` }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  questionCounter: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  scoreText: {
    fontSize: 14,
    color: '#64748b',
  },
  scoreValue: {
    fontWeight: '600',
    color: '#3b82f6',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },
});

export default QuizProgress;