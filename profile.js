let user = JSON.parse(localStorage.getItem("user"));

if(user){

document.getElementById("studentName").innerHTML = user.name;

document.getElementById("studentEmail").innerHTML = user.email;

}