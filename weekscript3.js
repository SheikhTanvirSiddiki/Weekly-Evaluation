        // Function to check if the correct password is stored
        function checkPassword() {
            const storedPassword = sessionStorage.getItem('password');
            const correctPassword = '356@23Qr';

            if (!storedPassword || storedPassword !== correctPassword) {
                // Redirect to the password entry page if the password is not set or is incorrect
                window.location.href = 'password.html'; // Replace with your actual password entry page
            }
        }

        // Call the checkPassword function on page load
        window.onload = checkPassword;
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyDVuzE5w57dW6pqrvYvIVR9c9XR9sqkDN4",
    authDomain: "weeklyevaluation.firebaseapp.com",
    databaseURL: "https://weeklyevaluation-default-rtdb.firebaseio.com",
    projectId: "weeklyevaluation",
    storageBucket: "weeklyevaluation.appspot.com",
    messagingSenderId: "865170668803",
    appId: "1:865170668803:web:9804cdc685aadcc9283d36",
    measurementId: "G-ST6P9PV1WV"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Show custom alert
function showCustomAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}
// Close alert
document.getElementById('close-alert').addEventListener('click', function () {
    document.getElementById('custom-alert').style.display = 'none';
});
document.getElementById('result-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const batch = document.getElementById('batch').value;
    // Check if a batch is selected
    if (batch === "None") {
        showCustomAlert('দয়া করে একটি ব্যাচ সিলেক্ট করুন।');
        return; // Prevent submission
    }
    const name = document.getElementById('name').value;
    const marks = document.getElementById('marks').value;
    const comments = document.getElementById('comments').value;
    const resultData = {
        batch,
        name,
        marks: convertToBengaliNumbers(marks),
        comments: comments || null
    };
    const newResultRef = push(ref(database, 'results'));
    set(newResultRef, resultData)
        .then(() => {
            console.log('Result submitted successfully');
            showCustomAlert('রেজাল্ট সফলভাবে সাবমিট হয়েছে!'); // Use custom alert
            document.getElementById('result-form').reset(); // Reset the form fields
        })
        .catch(error => {
            console.error('Error submitting result: ', error);
            showCustomAlert('রেজাল্ট সাবমিট করতে সমস্যা হয়েছে।'); // Use custom alert for error
        });
});
function convertToBengaliNumbers(num) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(digit => bengaliDigits[digit]).join('');
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
e.preventDefault();
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
