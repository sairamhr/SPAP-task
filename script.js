// ==================== LOGIN ====================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const error = document.getElementById("error");

        error.innerHTML = "";

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            error.innerHTML = "Please register first.";
            return;
        }

        if (email === user.email && password === user.password) {

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        } else {

            error.innerHTML = "Invalid Email or Password.";

        }

    });

}

// ==================== SEARCH ====================

function searchStudent() {

    let input = document.getElementById("searchInput").value.toUpperCase();
    let table = document.getElementById("studentTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {

        let td = tr[i].getElementsByTagName("td")[0];

        if (td) {

            let text = td.textContent || td.innerText;

            tr[i].style.display =
                text.toUpperCase().indexOf(input) > -1 ? "" : "none";

        }

    }

}

// ==================== FILTER ====================

function filterStudents() {

    let filter = document.getElementById("filterStatus").value;
    let table = document.getElementById("studentTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {

        let grade = tr[i].getElementsByTagName("td")[3].innerHTML;

        if (filter === "all" || grade === filter) {

            tr[i].style.display = "";

        } else {

            tr[i].style.display = "none";

        }

    }

}

// ==================== DASHBOARD ====================

function updateDashboard() {

    const table = document.getElementById("studentTable");

    if (!table) return;

    const rows = table.getElementsByTagName("tr");

    let total = rows.length - 1;
    let passed = 0;
    let failed = 0;
    let totalMarks = 0;

    for (let i = 1; i < rows.length; i++) {

        let marks = parseInt(rows[i].cells[2].innerHTML);

        let status = rows[i].cells[4].innerHTML;

        totalMarks += marks;

        if (status == "Pass") {

            passed++;

        } else {

            failed++;

        }

    }

    document.getElementById("totalStudents").innerHTML = total;
    document.getElementById("passedStudents").innerHTML = passed;
    document.getElementById("failedStudents").innerHTML = failed;
Math.round(totalMarks / total) + "50%";
}

updateDashboard();
function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

    }
    else{

        localStorage.setItem("theme","light");

    }

}


// Page load par theme check

window.onload = function(){

    let theme = localStorage.getItem("theme");

    if(theme === "dark"){

        document.body.classList.add("dark-mode");

    }

}
function sortStudents() {

    let table = document.getElementById("studentTable");
    let rows = Array.from(table.rows).slice(1);
    let option = document.getElementById("sortOption").value;

    rows.sort(function(a, b) {

        if (option == "nameAsc") {
            return a.cells[1].innerHTML.localeCompare(b.cells[1].innerHTML);
        }

        if (option == "nameDesc") {
            return b.cells[1].innerHTML.localeCompare(a.cells[1].innerHTML);
        }

        if (option == "marksHigh") {
            return parseInt(b.cells[2].innerHTML) - parseInt(a.cells[2].innerHTML);
        }

        if (option == "marksLow") {
            return parseInt(a.cells[2].innerHTML) - parseInt(b.cells[2].innerHTML);
        }

        return 0;
    });

    for (let row of rows) {
        table.appendChild(row);
    }
}
let role = localStorage.getItem("role");

let menu = document.getElementById("menu");

if(role=="admin")
{
menu.innerHTML=`
<a href="dashboard.html">Dashboard</a>
<a href="students.html">Students</a>
<a href="teachers.html">Teachers</a>
<a href="profile.html">Profile</a>
`;
}

else if(role=="teacher")
{
menu.innerHTML=`
<a href="dashboard.html">Dashboard</a>
<a href="attendance.html">Attendance</a>
<a href="profile.html">Profile</a>
`;
}

else
{
menu.innerHTML=`
<a href="dashboard.html">Dashboard</a>
<a href="result.html">Results</a>
<a href="profile.html">Profile</a>
`;
}
function showNotification(){

let panel=document.getElementById("notificationPanel");

if(panel.style.display=="block")
panel.style.display="none";

else
panel.style.display="block";
function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

}
}
function filterDepartment() {
    let filter = document.getElementById("departmentFilter").value;
    let table = document.getElementById("studentTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[3];

        if (td) {
            let text = td.textContent;

            if (filter === "All" || text === filter) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
let currentPage = 1;
let rowsPerPage = 2;

function showPage(page){

    let table = document.getElementById("studentTable");
    let rows = table.getElementsByTagName("tr");

    for(let i=1;i<rows.length;i++){
        rows[i].style.display="none";
    }

    let start=(page-1)*rowsPerPage+1;
    let end=start+rowsPerPage-1;

    for(let i=start;i<=end && i<rows.length;i++){
        rows[i].style.display="";
    }

    document.getElementById("pageNumber").innerText=page;
}

function nextPage(){

    let rows=document.getElementById("studentTable").rows.length-1;
    let totalPages=Math.ceil(rows/rowsPerPage);

    if(currentPage<totalPages){
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage(){

    if(currentPage>1){
        currentPage--;
        showPage(currentPage);
    }
}
function exportCSV(){

    let table=document.getElementById("studentTable");
    let rows=table.querySelectorAll("tr");

    let csv=[];

    rows.forEach(row=>{
        let cols=row.querySelectorAll("th,td");
        let data=[];

        cols.forEach(col=>{
            data.push(col.innerText);
        });

        csv.push(data.join(","));
    });

    let csvFile=new Blob([csv.join("\n")],{type:"text/csv"});

    let downloadLink=document.createElement("a");

    downloadLink.download="Student_Report.csv";
    downloadLink.href=window.URL.createObjectURL(csvFile);
    downloadLink.click();
}

async function exportPDF(){

    const { jsPDF } = window.jspdf;

    const doc=new jsPDF();

    doc.text("Student Performance Report",20,20);

    doc.save("Student_Report.pdf");
}
const ctx = document.getElementById("studentChart").getContext("2d");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Ali", "Ahmed", "Sara", "Fatima"],
        datasets: [{
            label: "Student Marks",
            data: [85, 85, 88, 47],
            backgroundColor: [
                "blue",
                "green",
                "orange",
                "red"
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
function addActivity(message){

    let list=document.getElementById("activityList");

    let item=document.createElement("li");

    item.textContent=message;

    list.prepend(item);
}
const form=document.getElementById("registerForm");

form.addEventListener("submit",function(e){

e.preventDefault();

let name=document.getElementById("name").value.trim();
let email=document.getElementById("email").value.trim();
let password=document.getElementById("password").value.trim();

if(name==""){
alert("Please enter your name");
return;
}

if(email==""){
alert("Please enter email");
return;
}

if(password.length<6){
alert("Password must be at least 6 characters");
return;
}

alert("Registration Successful");

});