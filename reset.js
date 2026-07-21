const resetForm = document.getElementById("resetForm");

resetForm.addEventListener("submit", function(e){

e.preventDefault();

let newPassword=document.getElementById("newPassword").value;

let confirmPassword=document.getElementById("confirmPassword").value;

let message=document.getElementById("resetMessage");

if(newPassword!==confirmPassword){

message.innerHTML="Passwords do not match!";
message.style.color="red";

return;

}

let user=JSON.parse(localStorage.getItem("user"));

user.password=newPassword;

localStorage.setItem("user",JSON.stringify(user));

message.innerHTML="Password Reset Successfully!";
message.style.color="green";

setTimeout(function(){

window.location.href="index.html";

},2000);

});