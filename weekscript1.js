// Define the correct password
const correctPassword = "356@23Qr"; // Replace with your actual password

// Function to check the password
function checkPassword() {
    const enteredPassword = document.getElementById("password").value;

    // Check if the entered password matches the correct password
    if (enteredPassword === correctPassword) {
        // Store the authentication status in localStorage (persists even after browser restarts)
        localStorage.setItem("authenticated", "true");

        // Redirect to the protected page
        window.location.href = "dashboard.html"; // Change this to your protected page URL
    } else {
        // Show the custom alert for incorrect password
        const alertBox = document.getElementById("alert-box");
        alertBox.style.display = "block";

        // Hide the alert after 3 seconds
        setTimeout(() => {
            alertBox.style.display = "none";
        }, 3000);
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
