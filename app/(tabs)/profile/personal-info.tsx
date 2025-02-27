import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { ArrowLeft, Camera, User, Mail, Phone, Calendar, MapPin, Save, AtSign, LogOut } from 'lucide-react-native';
import { useAuth } from '../../../hooks/useAuth';
import { tr } from '../../../localization/translations';

export default function PersonalInfoScreen() {
  const { user, logout, updateUserInfo, isAuthenticated, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || 'Adam Wolf',
    username: user?.username || '',
    email: user?.email || 'user@example.com',
    phone: '+90 (555) 123 45 67',
    birthdate: '15.05.1990',
    address: 'Atatürk Bulvarı No:123, Çankaya, Ankara'
  });
  
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });
  
  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading]);
  
  // Set initial username when component mounts
  useEffect(() => {
    if (user?.username) {
      setFormData(prev => ({
        ...prev,
        username: user.username
      }));
    } else if (formData.name) {
      // Generate username from full name only if no username exists
      const generatedUsername = formData.name
        .toLowerCase()
        .replace(/\s+/g, '') // Remove spaces
        .replace(/[^a-z0-9]/g, ''); // Remove special characters
      
      setFormData(prev => ({
        ...prev,
        username: generatedUsername
      }));
    }
  }, [user?.username, formData.name]);
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = tr('nameRequired');
      isValid = false;
    }
    
    if (!formData.username.trim()) {
      newErrors.username = tr('usernameRequired');
      isValid = false;
    } else if (formData.username.includes(' ')) {
      newErrors.username = tr('usernameNoSpaces');
      isValid = false;
    } else if (!/^[a-z0-9_\.]+$/.test(formData.username)) {
      newErrors.username = tr('usernameInvalidChars');
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = tr('emailRequired');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = tr('emailInvalid');
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = tr('phoneRequired');
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSave = async () => {
    if (validateForm()) {
      try {
        // Update user info in auth context
        await updateUserInfo({
          ...user,
          name: formData.name,
          username: formData.username,
          email: formData.email
        });
        
        Alert.alert(
          tr('success'),
          tr('profileUpdateSuccess'),
          [{ text: tr('ok') }]
        );
        
        router.back();
      } catch (error) {
        Alert.alert(
          tr('error'),
          tr('profileUpdateError'),
          [{ text: tr('ok') }]
        );
      }
    }
  };
  
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{tr('personalInformation')}</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.changePhotoText}>{tr('changeProfilePhoto')}</Text>
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{tr('fullName')}</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleChange('name', value)}
                placeholder={tr('enterFullName')}
              />
            </View>
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{tr('username')}</Text>
            <View style={styles.inputContainer}>
              <AtSign size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(value) => handleChange('username', value)}
                placeholder={tr('chooseUsername')}
                autoCapitalize="none"
                editable={true}
              />
            </View>
            <Text style={styles.helperText}>{tr('usernameHelperText')}</Text>
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{tr('emailAddress')}</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                placeholder={tr('enterEmail')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{tr('phoneNumber')}</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => handleChange('phone', value)}
                placeholder={tr('enterPhoneNumber')}
                keyboardType="phone-pad"
              />
            </View>
            {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{tr('dateOfBirth')}</Text>
            <View style={styles.inputContainer}>
              <Calendar size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                value={formData.birthdate}
                onChangeText={(value) => handleChange('birthdate', value)}
                placeholder="GG.AA.YYYY"
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{tr('address')}</Text>
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(value) => handleChange('address', value)}
                placeholder={tr('enterAddress')}
                multiline
              />
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Save size={20} color="#fff" />
          <Text style={styles.saveButtonText}>{tr('saveChanges')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutButtonText}>{tr('logout')}</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileImageSection: {
    alignItems: 'center',
    padding: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  changePhotoText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#f8fafc',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});