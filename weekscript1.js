const correctPassword = "356@23Qr";
function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    if (enteredPassword === correctPassword) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        showAlert();
    }
}
function showAlert() {
    const alertBox = document.getElementById('alert-box');
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000); // Alert will disappear after 3 seconds
}
window.onload = function () {
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
}
    // Disable right-click
document.addEventListener('contextmenu', function(e) {
e.preventDefault();
});
// Disable common developer tool shortcuts
document.addEventListener('keydown', function(e) {
// Disable F12 key for developer tools
if (e.key === 'F12') {
e.preventDefault();
}
// Disable Ctrl+Shift+I (Inspect)
if (e.ctrlKey && e.shiftKey && e.key === 'I') {
e.preventDefault();
}
// Disable Ctrl+Shift+C (Element picker)
if (e.ctrlKey && e.shiftKey && e.key === 'C') {
e.preventDefault()
}
// Disable Ctrl+Shift+J (Console)
if (e.ctrlKey && e.shiftKey && e.key === 'J') {
e.preventDefault();
}
// Disable Ctrl+U (View page source)
if (e.ctrlKey && e.key === 'u') {
e.preventDefault();
}
});