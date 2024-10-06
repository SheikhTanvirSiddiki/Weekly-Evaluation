function checkAuthentication() {
    const isAuthenticated = localStorage.getItem("authenticated");
  
    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
        window.location.href = "index.html"; // Change this to your login page URL
    }
  }
  
  // Call checkAuthentication on page load for all protected pages
  window.onload = checkAuthentication
        // Import Firebase functions
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
        import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
        // Your web app's Firebase configuration
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
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        // Function to convert Bengali numbers to English numbers
        function convertBengaliToEnglish(bengaliNumber) {
            const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
            let englishNumber = '';
            for (let char of bengaliNumber) {
                const index = bengaliDigits.indexOf(char);
                englishNumber += (index !== -1) ? index : char; // Add index if it's a Bengali digit
            }
            return englishNumber; // Return the converted string
        }
        // Function to convert English numbers to Bengali numbers
        function convertEnglishToBengali(englishNumber) {
            const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
            let bengaliNumber = '';
            for (let char of englishNumber.toString()) {
                const index = englishDigits.indexOf(char);
                bengaliNumber += (index !== -1) ? bengaliDigits[index] : char; // Add Bengali digit if found
            }
            return bengaliNumber; // Return the converted string
        }
        // Fetch results from Firebase
        const fetchResults = () => {
            const resultsRef = ref(db, 'results');
            onValue(resultsRef, (snapshot) => {
                const results = [];
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    const englishMarks = convertBengaliToEnglish(data.marks);
                    const marks = parseInt(englishMarks, 10);
                    if (!isNaN(marks) && data.batch === 'batch3') {
                        results.push({
                            id: childSnapshot.key,
                            name: data.name,
                            marks: marks,
                            comments: data.comments || "" // Initialize comments as empty if not present
                        });
                    }
                });
                // Assign roll numbers and display results
                assignRollNumbers(results);
                displayResults(results);
            });
        };
        // Function to calculate and assign roll numbers based on marks
        function assignRollNumbers(results) {
            results.sort((a, b) => b.marks - a.marks);
            let roll = 1;
            for (let i = 0; i < results.length; i++) {
                if (i > 0 && results[i].marks === results[i - 1].marks) {
                    results[i].roll = results[i - 1].roll;
                } else {
                    results[i].roll = roll;
                    roll++;
                }
            }
        }
        // Function to display results in the table
        function displayResults(results) {
            const resultsTableBody = document.getElementById("resultsTableBody");
            resultsTableBody.innerHTML = ""; // Clear previous results
            results.forEach(result => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${convertEnglishToBengali(result.roll)}</td>
                    <td>${result.name}</td>
                    <td>${convertEnglishToBengali(result.marks)}</td>
                    <td>
                        <span>${result.comments}</span>
                    </td>
                    <td>
                        <button class="edit-btn" onclick="editResult('${result.id}', '${result.name}', '${result.marks}', '${result.comments}')">এডিট</button>
                        <button class="delete-btn" onclick="deleteResult('${result.id}')">মুছুন</button>
                    </td>
                `;
                resultsTableBody.appendChild(row);
            });
        }
        // Function to edit all fields of a result
        window.editResult = (id, currentName, currentMarks, currentComments) => {
            const newName = prompt("নতুন নাম লিখুন:", currentName);
            const newMarks = prompt("নতুন নম্বর লিখুন:", currentMarks);
            const newComments = prompt("নতুন মন্তব্য লিখুন:", currentComments);
            if (newName !== null && newMarks !== null && newComments !== null) {
                update(ref(db, 'results/' + id), {
                    name: newName,
                    marks: newMarks,
                    comments: newComments
                }).then(() => {
                    fetchResults(); // Refresh the results after editing
                }).catch(error => {
                    console.error("Error updating result: ", error);
                });
            }
        };
        // Function to delete a result
        window.deleteResult = (id) => {
            if (confirm("আপনি কি সত্যিই মুছতে চান?")) {
                remove(ref(db, 'results/' + id)).then(() => {
                    fetchResults(); // Refresh the results after deletion
                }).catch(error => {
                    console.error("Error deleting result: ", error);
                });
            }
        };
        // Fetch results on page load
        fetchResults();
            // Disable right-click
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
    // Disable common developer tool shortcuts
    document.addEventListener('keydown', function(e) {
      // Disable F12 key for developer tools
      if (e.key === 'F12') {
        e.preventDefault();;
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
