// Function to check if the user is already authenticated
function checkAuthentication() {
  const isAuthenticated = localStorage.getItem("authenticated");

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
      window.location.href = "https://weeklyevaluation.vercel.app/"; // Change this to your login page URL
  }
}

// Call checkAuthentication on page load for all protected pages
window.onload = checkAuthentication
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
