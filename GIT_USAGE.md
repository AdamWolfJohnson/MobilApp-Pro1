# Git Otomatik Güncelleme Kullanım Talimatları

## Yapılandırma

Git otomatik güncelleme sistemi, projenizin değişikliklerini otomatik olarak GitHub deposuna gönderir.

Depo URL'si şu şekilde yapılandırılmıştır:
```
https://github.com/AdamWolfJohnson/MobilApp-Pro1
```

## Kullanım

1. Projenizde değişiklikler yaptıktan sonra, şu komutu çalıştırın:
   ```
   npm run git:update
   ```

2. Bu komut:
   - Değişiklikleri tespit eder
   - Değişiklikleri commit eder
   - GitHub deposuna push eder

## Yapılandırmayı Değiştirme

Farklı bir depo veya dal kullanmak isterseniz, `.env` dosyasını düzenleyin:

```
GIT_REMOTE_URL=https://github.com/AdamWolfJohnson/MobilApp-Pro1
GIT_BRANCH=main
GIT_COMMIT_MESSAGE=Auto-update: Project changes
```