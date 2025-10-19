const firebaseConfig = {
  apiKey: "AIzaSyCut17GMayP4_3FxVZIhn95sXQ7DNDoT6o",
  authDomain: "biogram-1d611.firebaseapp.com",
  projectId: "biogram-1d611",
  storageBucket: "biogram-1d611.firebasestorage.app",
  messagingSenderId: "396800680411",
  appId: "1:396800680411:web:bf95d41b678c72ae1807fe",
  measurementId: "G-8HQLCBG5PL"
};
const auth = firebase.auth(// التحقق من المستخدم الحالي
auth.onAuthStateChanged(user => {
  if(user){
    console.log("المستخدم مسجل الدخول:", user.phoneNumber);
  } else {
    console.log("لم يسجل دخول بعد");
  }
});

// تسجيل خروج
auth.signOut();
);
const db = firebase.firestore(db.collection('users').doc(user.uid).set({
  username: "user123",
  displayName: "محمد",
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
});
);
const storage = firebase.storage(const file = document.getElementById('changeImage').files[0];
const ref = storage.ref().child(`profileImages/${user.uid}`);
ref.put(file).then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
  console.log("رابط الصورة:", url);
});
);

const profileImage = document.getElementById('profileImage');
const changeImage = document.getElementById('changeImage');
const removeImageBtn = document.getElementById('removeImageBtn');
const displayNameInput = document.getElementById('displayName');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const backBtn = document.getElementById('backBtn');

let currentUser = null;
auth.onAuthStateChanged(async user => {
  if(!user) window.location.href = "login.html";
  currentUser = user;
  const doc = await db.collection('users').doc(user.uid).get();
  if(doc.exists){
    displayNameInput.value = doc.data().displayName;
    if(doc.data().photoURL) profileImage.src = doc.data().photoURL;
    else profileImage.src = 'default-avatar.png';
  }
});

changeImage.onchange = async e=>{
  const file = e.target.files[0];
  if(!file) return;
  const ref = storage.ref().child(`profileImages/${currentUser.uid}`);
  await ref.put(file);
  const url = await ref.getDownloadURL();
  profileImage.src = url;
  await db.collection('users').doc(currentUser.uid).update({photoURL:url});
};

removeImageBtn.onclick = async ()=>{
  profileImage.src = 'default-avatar.png';
  await db.collection('users').doc(currentUser.uid).update({photoURL:null});
};

saveProfileBtn.onclick = async ()=>{
  await db.collection('users').doc(currentUser.uid).update({displayName: displayNameInput.value});
  alert('تم حفظ التغييرات');
};

backBtn.onclick = ()=>window.location.href="main.html";
