        const correctPassword = "356@23Qr"; // Define the correct password

        // Function to check password
        function checkPassword() {
            const enteredPassword = document.getElementById('password').value;
            if (enteredPassword === correctPassword) {
                // Store login status in localStorage
                localStorage.setItem('loggedIn', 'true');
                // Redirect to the dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Show error alert
                showAlert();
            }
        }

        // Function to show alert
        function showAlert() {
            const alertBox = document.getElementById('alert-box');
            alertBox.style.display = 'block';
            // Hide alert after 3 seconds
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 3000);
        }

        // Check if the user is already logged in on page load
        window.onload = function () {
            if (localStorage.getItem('loggedIn') === 'true') {
                window.location.href = 'dashboard.html'; // Redirect if logged in
            }
        }

        // Attach the checkPassword function to the login button
        document.getElementById('login-btn').addEventListener('click', checkPassword);
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
