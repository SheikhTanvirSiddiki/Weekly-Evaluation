function checkAuthentication(){localStorage.getItem("authenticated")||(window.location.href="https://weeklyevaluation.vercel.app/")}window.onload=checkAuthentication;import{initializeApp}from"https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";import{getDatabase,ref,onValue,update,remove}from"https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";const firebaseConfig={apiKey:"AIzaSyDVuzE5w57dW6pqrvYvIVR9c9XR9sqkDN4",authDomain:"weeklyevaluation.firebaseapp.com",databaseURL:"https://weeklyevaluation-default-rtdb.firebaseio.com",projectId:"weeklyevaluation",storageBucket:"weeklyevaluation.appspot.com",messagingSenderId:"865170668803",appId:"1:865170668803:web:9804cdc685aadcc9283d36",measurementId:"G-ST6P9PV1WV"},app=initializeApp(firebaseConfig),db=getDatabase(app);function convertBengaliToEnglish(e){const t=["০","১","২","৩","৪","৫","৬","৭","৮","৯"];let n="";for(let a of e){const e=t.indexOf(a);n+=-1!==e?e:a}return n}function convertEnglishToBengali(e){const t=["0","1","2","3","4","5","6","7","8","9"],n=["০","১","২","৩","৪","৫","৬","৭","৮","৯"];let a="";for(let o of e.toString()){const e=t.indexOf(o);a+=-1!==e?n[e]:o}return a}const fetchResults=()=>{const e=ref(db,"results");onValue(e,(e=>{const t=[];e.forEach((e=>{const n=e.val(),a=convertBengaliToEnglish(n.marks),o=parseInt(a,10);isNaN(o)||"batch2"!==n.batch||t.push({id:e.key,name:n.name,marks:o,comments:n.comments||""})})),assignRollNumbers(t),displayResults(t)}))};function assignRollNumbers(e){e.sort(((e,t)=>t.marks-e.marks));let t=1;for(let n=0;n<e.length;n++)n>0&&e[n].marks===e[n-1].marks?e[n].roll=e[n-1].roll:(e[n].roll=t,t++)}function displayResults(e){const t=document.getElementById("resultsTableBody");t.innerHTML="",e.forEach((e=>{const n=document.createElement("tr");n.innerHTML=`\n                    <td>${convertEnglishToBengali(e.roll)}</td>\n                    <td>${e.name}</td>\n                    <td>${convertEnglishToBengali(e.marks)}</td>\n                    <td>\n                        <span>${e.comments}</span>\n                    </td>\n                    <td>\n                        <button class="edit-btn" onclick="editResult('${e.id}', '${e.name}', '${e.marks}', '${e.comments}')">এডিট</button>\n                        <button class="delete-btn" onclick="deleteResult('${e.id}')">মুছুন</button>\n                    </td>\n                `,t.appendChild(n)}))}window.editResult=(e,t,n,a)=>{const o=prompt("নতুন নাম লিখুন:",t),s=prompt("নতুন নম্বর লিখুন:",n),l=prompt("নতুন মন্তব্য লিখুন:",a);null!==o&&null!==s&&null!==l&&update(ref(db,"results/"+e),{name:o,marks:s,comments:l}).then((()=>{fetchResults()})).catch((e=>{console.error("Error updating result: ",e)}))},window.deleteResult=e=>{confirm("আপনি কি সত্যিই মুছতে চান?")&&remove(ref(db,"results/"+e)).then((()=>{fetchResults()})).catch((e=>{console.error("Error deleting result: ",e)}))},fetchResults(),document.addEventListener("contextmenu",(function(e){e.preventDefault()})),document.addEventListener("keydown",(function(e){"F12"===e.key&&e.preventDefault(),e.ctrlKey&&e.shiftKey&&"I"===e.key&&e.preventDefault(),e.ctrlKey&&e.shiftKey&&"C"===e.key&&e.preventDefault(),e.ctrlKey&&e.shiftKey&&"J"===e.key&&e.preventDefault(),e.ctrlKey&&"u"===e.key&&e.preventDefault()}));