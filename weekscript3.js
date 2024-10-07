import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Function to check if the user is already authenticated
function checkAuthentication() {
    const isAuthenticated = localStorage.getItem("authenticated");

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
        window.location.href = "https://weeklyevaluation.vercel.app/"; // Change this to your login page URL
    }
}

// Call checkAuthentication on page load for all protected pages
window.onload = checkAuthentication;

const firebaseConfig = {
    apiKey: "AIzaSyDVuzE5w57dW6pqrvYvIVR9c9XR9sqkDN4",
    authDomain: "weeklyevaluation.firebaseapp.com",
    databaseURL: "https://weeklyevaluation-default-rtdb.firebaseio.com",
    projectId: "weeklyevaluation",
    storageBucket: "weeklyevaluation.appspot.com",
    messagingSenderId: "865170668803",
    appId: "1:865170668803:web:f32d3b76b6d79dfc48046c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Add event listener for the result submission form
document.getElementById("result-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get input values
    const batch = document.getElementById("batch").value;
    const name = document.getElementById("name").value;
    const marks = document.getElementById("marks").value;
    const comments = document.getElementById("comments").value;
    const customComment = document.getElementById("custom-comment").value;

    // Check if a batch is selected
    if (batch === "None") {
        showAlert('দয়া করে একটি ব্যাচ সিলেক্ট করুন।', 'danger');
        return; // Prevent submission
    }

    // Display loader
    document.getElementById("loader-background").style.display = "block";
    document.getElementById("loader").style.display = "block";
    document.getElementById("main-content").classList.add("loading");

    // Push data to Firebase
    const resultRef = ref(database, 'results'); // Change to the results collection
    push(resultRef, {
        batch: batch,
        name: name,
        marks: marks,
        comments: comments === 'custom' ? customComment : comments
    }).then(() => {
        // Hide loader
        document.getElementById("loader-background").style.display = "none";
        document.getElementById("loader").style.display = "none";
        document.getElementById("main-content").classList.remove("loading");
        showAlert('রেজাল্ট সফলভাবে সাবমিট হয়েছে!', 'success');
        document.getElementById("result-form").reset(); // Reset the form
    }).catch((error) => {
        // Hide loader
        document.getElementById("loader-background").style.display = "none";
        document.getElementById("loader").style.display = "none";
        document.getElementById("main-content").classList.remove("loading");
        showAlert('রেজাল্ট সাবমিট করতে সমস্যা হয়েছে: ' + error.message, 'danger');
    });
});

// Show alert function
function showAlert(message, type) {
    const alertDiv = document.getElementById("custom-alert");
    alertDiv.className = "alert alert-" + type;
    document.getElementById("alert-message").innerText = message;
    alertDiv.style.display = "block";
    setTimeout(() => {
        alertDiv.style.display = "none";
    }, 3000);
}

// Close alert
document.getElementById("close-alert").addEventListener("click", function () {
    document.getElementById("custom-alert").style.display = "none";
});

// Toggle custom comment input
document.getElementById("comments").addEventListener("change", function () {
    const customCommentInput = document.getElementById("custom-comment");
    if (this.value === "custom") {
        customCommentInput.style.display = "block";
        customCommentInput.required = true; // Make custom comment input required
    } else {
        customCommentInput.style.display = "none";
        customCommentInput.required = false; // Remove required attribute
    }
});

// Disable right-click and common developer tools shortcuts
document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // Disable right-click context menu
});

document.addEventListener('keydown', function (e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, and Ctrl+U
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C')) || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault(); // Disable the keys
    }
});
