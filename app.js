document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  if (username) {
    localStorage.setItem('username', username);
    window.location.href = 'profile.html';
  } else {
    alert('يرجى إدخال اسم المستخدم');
  }
});
