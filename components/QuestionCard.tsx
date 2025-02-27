import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Question } from '../data/questions';
import { CircleCheck as CheckCircle2, Circle as XCircle, CircleHelp as HelpCircle, ArrowRight } from 'lucide-react-native';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionId: string) => void;
  onNext: () => void;
  showResult: boolean;
  selectedOptionId?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onNext,
  showResult,
  selectedOptionId
}) => {
  const isCorrect = selectedOptionId === question.correctOptionId;
  
  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question.text}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = option.id === question.correctOptionId;
          
          let optionStyle = styles.option;
          let textStyle = styles.optionText;
          let iconComponent = null;
          
          if (showResult) {
            if (isCorrectOption) {
              optionStyle = {...optionStyle, ...styles.correctOption};
              textStyle = {...textStyle, ...styles.correctOptionText};
              iconComponent = <CheckCircle2 size={20} color="#16a34a" />;
            } else if (isSelected && !isCorrectOption) {
              optionStyle = {...optionStyle, ...styles.incorrectOption};
              textStyle = {...textStyle, ...styles.incorrectOptionText};
              iconComponent = <XCircle size={20} color="#dc2626" />;
            }
          } else if (isSelected) {
            optionStyle = {...optionStyle, ...styles.selectedOption};
            textStyle = {...textStyle, ...styles.selectedOptionText};
          }
          
          return (
            <TouchableOpacity
              key={option.id}
              style={optionStyle}
              onPress={() => !showResult && onAnswer(option.id)}
              disabled={showResult}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionLetter}>{option.id}</Text>
                <Text style={textStyle}>{option.text}</Text>
              </View>
              {iconComponent}
            </TouchableOpacity>
          );
        })}
      </View>
      
      {showResult && (
        <View style={styles.explanationContainer}>
          <View style={styles.explanationHeader}>
            <HelpCircle size={20} color="#3b82f6" />
            <Text style={styles.explanationTitle}>Açıklama</Text>
          </View>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
      
      {showResult && (
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Sonraki Soru</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#f8fafc',
  },
  selectedOption: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  correctOption: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  incorrectOption: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#334155',
    flex: 1,
  },
  selectedOptionText: {
    color: '#1e40af',
    fontWeight: '500',
  },
  correctOptionText: {
    color: '#16a34a',
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: '#dc2626',
    fontWeight: '500',
  },
  explanationContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
    marginLeft: 8,
  },
  explanationText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default QuestionCard;