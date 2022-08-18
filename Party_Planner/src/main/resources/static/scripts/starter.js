'use strict'

let fullName = document.querySelector("#fname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let startBtn = document.querySelector("#startBtn");
let errorSpace = document.querySelector("#error-space");
let errorMsg = document.createElement("div");
errorMsg.setAttribute("class", "error");

let setup = () => {

    if (fullName.value == "") {
        errorMsg.textContent = `Please enter your full name`;
        errorSpace.appendChild(errorMsg);
    } else if (email.value == "") {
        errorMsg.textContent = `Please enter your email address`;
        errorSpace.appendChild(errorMsg);
    } else if (password.value == "") {
        errorMsg.textContent = `Please enter a password`;
        errorSpace.appendChild(errorMsg);
    } else {
        let host = {
            "name": fullName.value,
            "email": email.value,
            "password": password.value,
        }
    
        axios.post("http://localhost:8080/setup", host)
        .then (
            window.location.replace("./host.html")
        ).catch (err => {console.log(err);})
    }


}

startBtn.addEventListener("click", setup);