'use strict'

let emailIn = document.querySelector("#email");
let passwordIn = document.querySelector("#password");
let errorDiv = document.querySelector("#error-space");
let loginBtn = document.querySelector("#loginBtn");

let emilyBtn = document.querySelector("#makeEmily");
let sadBtn = document.querySelector("#sadBtn")

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
            let host = result.host;
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

let emily = () =>{
    let Emily = {
        "id": 1,
        "host": true,
        "name": "Emily Bradfield",
        "email": "emily-bradfield@outlook.com",
        "password": "root",
        "active": true,
        "attend": true,
        "accom": false,
        "park": false
    }

    axios.post("http://localhost:8080/create", Emily)
    .then( res => {
        errorDiv.innerHTML="";
        let emily = res.data;
        let display = document.createElement("h4");
        display.textContent = `${emily.name} created`;
        errorDiv.appendChild(display);
    })
}

let sad = () => {
    axios.delete("http://localhost:8080/delete?id=1")
}

loginBtn.addEventListener("click", validate)
emilyBtn.addEventListener("click", emily);
sadBtn.addEventListener("click", sad);