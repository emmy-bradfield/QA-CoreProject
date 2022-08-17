'use strict'

let emailIn = document.querySelector("#email");
let passwordIn = document.querySelector("#password");
let errorDiv = document.querySelector("#error-space");
let loginBtn = document.querySelector("#loginBtn");

let emilyBtn = document.querySelector("#makeEmily");
let jamesBtn = document.querySelector("#makeJames");

let validate = () => {
    let password = passwordIn.value;

    axios.get(`http://localhost:8080/viewEmail?email=${emailIn.value}`)
    .then( res => {
        let result = res.data;
        if (result.password != password) {
            errorDiv.innerHTML="";
            let errorMsg = document.createElement("div");
            errorMsg.setAttribute("class", "error");
            errorMsg.textContent = "The password entered is incorrect"
            errorDiv.appendChild(errorMsg)

        } else {
            let hiddenID = result.id;
            localStorage.setItem("userID", hiddenID);
            let password = result.password;
            localStorage.setItem("password", password)
            let host = result.host;
            if (result.active == false) {
                axios.put(`http://localhost:8080/activate?id=${hiddenID}`)
            }
            login(host);
        }
    }).catch(err => {
        errorDiv.innerHTML="";
        let errorMsg = document.createElement("div");
        errorMsg.setAttribute("class", "error");
        errorMsg.textContent = "The email address entered is not recognised";
        errorDiv.appendChild(errorMsg);
        console.log(err)});
}

let login = (host) => {
    if (host == true) {
        window.location.replace("./pages/host.html");
    } else {
        window.location.replace("./pages/guest.html");
    }
}

loginBtn.addEventListener("click", validate)