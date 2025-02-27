// Define available languages
export type Language = 'en' | 'tr';

// Current language (would be set by user preference in a real app)
let currentLanguage: Language = 'tr';

// Translation dictionaries
const translations = {
  en: {
    // Auth
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    username: 'Username',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: 'Don\'t have an account?',
    alreadyHaveAccount: 'Already have an account?',
    
    // Validation
    nameRequired: 'Name is required',
    usernameRequired: 'Username is required',
    usernameNoSpaces: 'Username cannot contain spaces',
    usernameInvalidChars: 'Username can only contain letters, numbers, dots and underscores',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email',
    phoneRequired: 'Phone number is required',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 8 characters',
    passwordsDoNotMatch: 'Passwords do not match',
    
    // Profile
    profile: 'Profile',
    personalInformation: 'Personal Information',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    dateOfBirth: 'Date of Birth',
    address: 'Address',
    changeProfilePhoto: 'Change Profile Photo',
    saveChanges: 'Save Changes',
    
    // Form placeholders
    enterFullName: 'Enter your full name',
    chooseUsername: 'Choose a username',
    enterEmail: 'Enter your email',
    enterPhoneNumber: 'Enter your phone number',
    enterAddress: 'Enter your address',
    
    // Helper texts
    usernameHelperText: 'Username will be used for login and cannot be changed later',
    
    // Menu items
    account: 'Account',
    achievements: 'Achievements',
    learningHistory: 'Learning History',
    studySchedule: 'Study Schedule',
    preferences: 'Preferences',
    notifications: 'Notifications',
    privacySecurity: 'Privacy & Security',
    helpSupport: 'Help & Support',
    
    // Stats
    tests: 'Tests',
    avgScore: 'Avg. Score',
    complete: 'Complete',
    
    // Alerts
    success: 'Success',
    error: 'Error',
    profileUpdateSuccess: 'Profile updated successfully',
    profileUpdateError: 'Failed to update profile',
    logoutConfirmTitle: 'Logout',
    logoutConfirmMessage: 'Are you sure you want to logout?',
    ok: 'OK',
    cancel: 'Cancel',
    
    // Misc
    version: 'Version',
    
    // Registration
    personalNumber: 'Personal Number',
    confirmPassword: 'Confirm Password',
    loggedOut: 'Logged out',
  },
  tr: {
    // Auth
    login: 'Giriş Yap',
    signup: 'Kayıt Ol',
    logout: 'Çıkış Yap',
    email: 'E-posta',
    password: 'Şifre',
    username: 'Kullanıcı Adı',
    forgotPassword: 'Şifremi Unuttum?',
    dontHaveAccount: 'Hesabınız yok mu?',
    alreadyHaveAccount: 'Zaten hesabınız var mı?',
    
    // Validation
    nameRequired: 'İsim gereklidir',
    usernameRequired: 'Kullanıcı adı gereklidir',
    usernameNoSpaces: 'Kullanıcı adı boşluk içeremez',
    usernameInvalidChars: 'Kullanıcı adı sadece harf, rakam, nokta ve alt çizgi içerebilir',
    emailRequired: 'E-posta gereklidir',
    emailInvalid: 'Lütfen geçerli bir e-posta adresi girin',
    phoneRequired: 'Telefon numarası gereklidir',
    passwordRequired: 'Şifre gereklidir',
    passwordTooShort: 'Şifre en az 8 karakter olmalıdır',
    passwordsDoNotMatch: 'Şifreler eşleşmiyor',
    
    // Profile
    profile: 'Profil',
    personalInformation: 'Kişisel Bilgiler',
    fullName: 'Ad Soyad',
    emailAddress: 'E-posta Adresi',
    phoneNumber: 'Telefon Numarası',
    dateOfBirth: 'Doğum Tarihi',
    address: 'Adres',
    changeProfilePhoto: 'Profil Fotoğrafını Değiştir',
    saveChanges: 'Değişiklikleri Kaydet',
    
    // Form placeholders
    enterFullName: 'Adınızı ve soyadınızı girin',
    chooseUsername: 'Bir kullanıcı adı seçin',
    enterEmail: 'E-posta adresinizi girin',
    enterPhoneNumber: 'Telefon numaranızı girin',
    enterAddress: 'Adresinizi girin',
    
    // Helper texts
    usernameHelperText: 'Kullanıcı adı giriş için kullanılacak ve daha sonra değiştirilemeyecektir',
    
    // Menu items
    account: 'Hesap',
    achievements: 'Başarılar',
    learningHistory: 'Öğrenme Geçmişi',
    studySchedule: 'Çalışma Programı',
    preferences: 'Tercihler',
    notifications: 'Bildirimler',
    privacySecurity: 'Gizlilik ve Güvenlik',
    helpSupport: 'Yardım ve Destek',
    
    // Stats
    tests: 'Testler',
    avgScore: 'Ort. Puan',
    complete: 'Tamamlanan',
    
    // Alerts
    success: 'Başarılı',
    error: 'Hata',
    profileUpdateSuccess: 'Profil başarıyla güncellendi',
    profileUpdateError: 'Profil güncellenirken bir hata oluştu',
    logoutConfirmTitle: 'Çıkış Yap',
    logoutConfirmMessage: 'Çıkış yapmak istediğinizden emin misiniz?',
    ok: 'Tamam',
    cancel: 'İptal',
    
    // Misc
    version: 'Versiyon',
    
    // Registration
    personalNumber: 'Kişisel Numara',
    confirmPassword: 'Şifreyi Onayla',
    loggedOut: 'Çıkış yapıldı',
  }
};

// Function to get translation
export function tr(key: keyof typeof translations.en): string {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

// Function to change language
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
}

// Function to get current language
export function getLanguage(): Language {
  return currentLanguage;
}