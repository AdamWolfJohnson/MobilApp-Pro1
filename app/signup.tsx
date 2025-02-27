import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Mail, Lock, User, ArrowLeft, CreditCard } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingIndicator from '../components/LoadingIndicator';
import { tr } from '../localization/translations';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [personalNumber, setPersonalNumber] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const { signup, isLoading, error, isAuthenticated } = useAuth();
  
  // Check if all required fields are filled to enable signup button
  const isFormComplete = 
    name.trim() !== '' && 
    email.trim() !== '' && 
    password.trim() !== '' && 
    confirmPassword.trim() !== '' && 
    password === confirmPassword &&
    password.length >= 8 &&
    /[a-zA-Z]/.test(password) && 
    /[0-9]/.test(password);

  // Check if user is already authenticated and redirect to tabs
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const validateForm = () => {
    let isValid = true;
    
    // Name validation
    if (!name.trim()) {
      setNameError(tr('nameRequired'));
      isValid = false;
    } else {
      setNameError('');
    }
    
    // Username validation
    if (username && username.includes(' ')) {
      setUsernameError(tr('usernameNoSpaces'));
      isValid = false;
    } else if (username && !/^[a-z0-9_\.]+$/.test(username)) {
      setUsernameError(tr('usernameInvalidChars'));
      isValid = false;
    } else {
      setUsernameError('');
    }
    
    // Email validation
    if (!email.trim()) {
      setEmailError(tr('emailRequired'));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(tr('emailInvalid'));
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Password validation
    if (!password) {
      setPasswordError(tr('passwordRequired'));
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Şifre en az 8 karakter olmalıdır');
      isValid = false;
    } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setPasswordError('Şifre hem harf hem de rakam içermelidir');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError(tr('passwordsDoNotMatch'));
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    return isValid;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    const success = await signup(name, email, password, personalNumber);
    if (success) {
      Alert.alert(
        'Kayıt Başarılı',
        'Hesabınız başarıyla oluşturuldu.',
        [
          {
            text: 'Tamam',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    }
  };

  // Generate username from name
  const generateUsername = () => {
    if (name) {
      const generatedUsername = name
        .toLowerCase()
        .replace(/\s+/g, '') // Remove spaces
        .replace(/[^a-z0-9]/g, ''); // Remove special characters
      
      setUsername(generatedUsername);
    }
  };

  if (isLoading) {
    return <LoadingIndicator fullScreen message={tr('signup') + '...'} />;
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{tr('signup')}</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>RoadReady'e Katılın</Text>
          <Text style={styles.subtitle}>Yolculuğunuza başlamak için hesap oluşturun</Text>
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.inputContainer}>
            <User color="#777" size={20} />
            <TextInput
              style={styles.input}
              placeholder={tr('fullName')}
              placeholderTextColor="#999"
              value={name}
              onChangeText={(value) => {
                setName(value);
                // Clear username if manually editing name
                if (username && username === name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')) {
                  generateUsername();
                }
              }}
              onBlur={generateUsername}
            />
          </View>
          {nameError ? <Text style={styles.fieldError}>{nameError}</Text> : null}
          
          <View style={styles.inputContainer}>
            <Mail color="#777" size={20} />
            <TextInput
              style={styles.input}
              placeholder={tr('emailAddress')}
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {emailError ? <Text style={styles.fieldError}>{emailError}</Text> : null}
          
          <View style={styles.inputContainer}>
            <CreditCard color="#777" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Kişisel Numara (İsteğe Bağlı)"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={personalNumber}
              onChangeText={setPersonalNumber}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Lock color="#777" size={20} />
            <TextInput
              style={styles.input}
              placeholder={tr('password')}
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {passwordError ? <Text style={styles.fieldError}>{passwordError}</Text> : null}
          
          <View style={styles.inputContainer}>
            <Lock color="#777" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Şifreyi Onayla"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          {confirmPasswordError ? <Text style={styles.fieldError}>{confirmPasswordError}</Text> : null}
          
          <Text style={styles.passwordRequirements}>
            Şifre en az 8 karakter uzunluğunda olmalı ve hem harf hem de rakam içermelidir.
          </Text>
          
          <TouchableOpacity 
            style={[
              styles.signupButton,
              !isFormComplete && styles.signupButtonDisabled
            ]}
            onPress={handleSignup}
            disabled={!isFormComplete || isLoading}
          >
            <Text style={[
              styles.signupButtonText,
              !isFormComplete && styles.signupButtonTextDisabled
            ]}>
              {tr('signup')}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              Kayıt olarak, {' '}
              <Text style={styles.termsLink}>Kullanım Koşulları</Text> ve{' '}
              <Text style={styles.termsLink}>Gizlilik Politikası</Text>'nı kabul etmiş olursunuz
            </Text>
          </View>
          
          <View style={styles.futureVerificationContainer}>
            <Text style={styles.futureVerificationText}>
              Not: Gelecekte e-posta doğrulaması eklenecektir.
            </Text>
          </View>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>{tr('alreadyHaveAccount')} </Text>
            <Link href="/" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>{tr('login')}</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
  },
  fieldError: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 4,
  },
  helperText: {
    color: '#64748b',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 16,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  passwordRequirements: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 20,
    lineHeight: 18,
  },
  signupButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  signupButtonDisabled: {
    backgroundColor: '#bfdbfe',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButtonTextDisabled: {
    color: '#93c5fd',
  },
  termsContainer: {
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  futureVerificationContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  futureVerificationText: {
    color: '#0284c7',
    fontSize: 14,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
});