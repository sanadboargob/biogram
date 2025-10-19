// --- Firebase Initialization ---
const firebaseConfig = { /*  apiKey: "AIzaSyCut17GMayP4_3FxVZIhn95sXQ7DNDoT6o",
  authDomain: "biogram-1d611.firebaseapp.com",
  projectId: "biogram-1d611",
  storageBucket: "biogram-1d611.firebasestorage.app",
  messagingSenderId: "396800680411",
  appId: "1:396800680411:web:bf95d41b678c72ae1807fe",
  measurementId: "G-8HQLCBG5PL"*/ };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// --- ReCAPTCHA ---
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  size: 'invisible'
});

const phoneInput = document.getElementById('phoneNumber');
const sendCodeBtn = document.getElementById('sendCodeBtn');
const verificationCodeInput = document.getElementById('verificationCode');
const verifyCodeBtn = document.getElementById('verifyCodeBtn');

let confirmationResult;

sendCodeBtn.onclick = async () => {
  const phoneNumber = phoneInput.value;
  if(!phoneNumber) return alert('أدخل رقم الهاتف');
  confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier);
  verificationCodeInput.style.display = 'block';
  verifyCodeBtn.style.display = 'block';
};

verifyCodeBtn.onclick = async () => {
  const code = verificationCodeInput.value;
  if(!code) return alert('أدخل الكود');
  const result = await confirmationResult.confirm(code);
  const user = result.user;

  // إنشاء اسم مستخدم تلقائي من رقم الهاتف
  let username = "user" + user.phoneNumber.slice(-4);

  // تخزين بيانات المستخدم في Firestore
  const userRef = db.collection('users').doc(user.uid);
  const doc = await userRef.get();
  if(!doc.exists){
    await userRef.set({
      phoneNumber: user.phoneNumber,
      username,
      displayName: username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  // الانتقال إلى الصفحة الرئيسية
  window.location.href = "main.html";
};
