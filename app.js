// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { set,
  push,
  ref,
  getDatabase,
  onValue,
  remove
 } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrqdnp9c8a_naWZSSeHwkjhw0JvYas__k",
  authDomain: "carshowroom-6d7df.firebaseapp.com",
  databaseURL: "https://carshowroom-6d7df-default-rtdb.firebaseio.com",
  projectId: "carshowroom-6d7df",
  storageBucket: "carshowroom-6d7df.appspot.com",
  messagingSenderId: "118120820662",
  appId: "1:118120820662:web:32bc4b9ebc44b889019b17",
  measurementId: "G-WQSKFP80QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

// window.addData= function(){
//   var obj = {
//     text: inp.value};
    
//     //--- Firebase method for key --//
//     obj.id = push(ref(db, "tasks")).key
//     var refrence = ref(db, `tasks/${obj.id}`)
//     set(refrence, obj)
//     // console.log(obj);

//     // var key = Math.random();
//     // key = key.toString().toString(2);

//     // refrence and data which save on database//
//     var refrence = ref (db, 'tasks/');
//     push(refrence, obj)
//     // set(refrence, obj);
//   };

//   var allTask;
//   function getData(){
//     const refrence = ref(db, "task/")
//     onValue(refrence, function (taskData){
//       allTask = taskData.val();
//       console.log(allTask, "Task Data");
//       var arr = Object.values(allTask);
//       console.log(arr, "Task Data");
//     })
//   };

//   getData();


// --------- REGISTRATION FORM --------- //
var name = document.getElementById("name")
var rollNum = document.getElementById("rollNum")


window.submitData = function () {

  if (name.value && rollNum.value) {
    // Student data object
    var userDataObj = {
      name: name.value,
      rollNum: rollNum.value,
    }

    // Sending data to DB
    userDataObj.key = push(ref(db, "Student Data")).key
    var reference = ref(db, `Student Data/${userDataObj.key}`)
    set(reference, userDataObj)

    // Fields will be set empty
    name.value = ''
    rollNum.value = ''
    alert("Thanks for registration")
    console.log(userDataObj)
  } else {
    alert("Data can't be empty")
  }

}

var allData = null;
// Retrieving data from DB
window.getUserData = function () {
  const reference = ref(db, "Student Data/")
  onValue(reference, function (data) {
    allData = data.val()
    var arr = Object.values(allData)
    displayData(arr)
    console.log("Array of all Data", arr)
  })
}

// Displaying all data from DB to browser
function displayData(allData) {
  const tableBody = document.getElementById('table--data');
  tableBody.innerHTML = ''; // Clear existing table data

  for (const key in allData) {
    if (allData.hasOwnProperty(key)) {
      const student = allData[key];
      console.log(student['name'])
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = student['name'];
      row.appendChild(nameCell);

      const rollNumberCell = document.createElement('td');
      rollNumberCell.textContent = student['rollNum'];
      row.appendChild(rollNumberCell);

      tableBody.appendChild(row);
    }
  }
}

// for removelist data from table //
document.getElementById('clear-data').addEventListener('click', function() {
  // Clear data from the Firebase database
  const reference = ref(db, "Student Data/");
  remove(reference)
    .then(() => {
      console.log("Data successfully removed");
      // Clear data from the table display
      const tableBody = document.getElementById('table--data');
      tableBody.innerHTML = ''; // Clear existing table data
      // alert("All data has been cleared");
    })
    .catch((error) => {
      console.error("Error removing data: ", error);
    });
});



// ---- firebase remove function to remove data and show data to display----///
// window.removeList = function(){
//   var refrence = ref(db, 'Student List/${tableBody}');
//   removeEventListener(refrence);
// }

// function getUserData() {
//   onValue(refrence, function (allData) {
//     console.log(allData, "Student Data"); // Changed allTask to allData
//     var arr = Object.values(allData); // Changed Object.value to Object.values
//     console.log(arr, "Student Data"); // Changed allDataData to allData
//     parent.innerHTML = "";
//     for (var i = 0; i < arr.length; i++) {
//       parent.innerHTML += `<p>${arr[i].text} 
//       <button onclick="removeList('${arr[i].id}')">Remove</button></p>`; // Corrected syntax for template literals and removeList function call
//     }
//   });
// }

// getUserData();

