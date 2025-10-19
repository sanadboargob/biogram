const auth = firebase.auth("biogram-1d611.firebaseapp.com",);
const logoutBtn = document.getElementById('logoutBtn');
const profileBtn = document.getElementById('profileBtn');

auth.onAuthStateChanged(user => {
  if(!user) window.location.href = "login.html";
});

logoutBtn.onclick = ()=>auth.signOut();
profileBtn.onclick = ()=>window.location.href="profile.html";
