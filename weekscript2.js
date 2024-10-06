        // Function to check if user is logged in
        function checkLogin() {
          const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // Check if user is logged in
          if (!isLoggedIn) {
              // Redirect to login page if not logged in
              window.location.href = 'index.html'; // Change 'login.html' to your actual login page URL
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