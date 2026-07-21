const forgotForm = document.getElementById("forgotForm");

forgotForm.addEventListener("submit", function(e){

    e.preventDefault();

    let email = document.getElementById("forgotEmail").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if(user && user.email === email){

        window.location.href = "reset-password.html";

    }else{

        document.getElementById("forgotMessage").innerHTML =
        "Email not found!";

    }

});