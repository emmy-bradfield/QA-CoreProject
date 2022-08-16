'use strict'

let id = localStorage["userID"];
let host = localStorage["host"];
let fullname = localStorage["name"];
let email = localStorage["email"];
let password = localStorage["password"];
let active = localStorage["active"];
let attend = localStorage["attend"];
let stay = localStorage["stay"];
let park = localStorage["park"];


let detailsOut = document.querySelector("#detailsOut");
let embedID = document.querySelector("#guestID-hidden");
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

let fullName = document.querySelector("#userName");

let nameIn = document.querySelector("#guestName");
let emailIn = document.querySelector("#guestEmail");
let attendIn = document.querySelector("#attend");
let stayIn = document.querySelector("#stay");
let parkIn = document.querySelector("#park");

let rsvpBtn = document.querySelector("#rsvp");
let saveRSVP = document.querySelector("#saveRSVP");
let settingsBtn = document.querySelector("#editUser");
let saveUser = document.querySelector("#saveUser");

let rsvpDiv = document.querySelector("#rsvpDiv");
let editDiv = document.querySelector("#settingsDiv");

let oldPass = document.querySelector("#oldPass");
let newPass = document.querySelector("#newPass");
let newPassTwo = document.querySelector("#newPassTwo");


let shareDetails = () => {
    if (localStorage['details'] != null) {
        detailsOut.placeholder = localStorage['details'];
    } else {
        detailsOut.innerHTML = "";
        detailsOut.placeholder = "When your host has added event details, they will appear here";
    }
    localStorage.removeItem['details'];
}

let importUser = () => {
    let id = embedID.value;
    axios.get(`http://localhost:8080/view?id=${id}`)
        .then(res => {
            let user = res.data;
            localStorage.setItem("name", user.name);
            localStorage.setItem("host", false);
            localStorage.setItem("email", user.email);
            localStorage.setItem("active", true);
            localStorage.setItem("attend", user.attend);
            localStorage.setItem("stay", user.stay);
            localStorage.setItem("park", user.park);

            fullName.innerHTML = "";
            fullName.textContent = localStorage["name"];

            nameIn.placeholder = localStorage["name"];
            nameIn.textContent = localStorage["name"];
            emailIn.placeholder = localStorage["email"];
            emailIn.textContent = localStorage["email"];

        })
}

let editUser = () =>{
    settingsBtn.disabled = true;
    nameIn.disabled = false;
    emailIn.disabled = false;
    newPass.disabled = false;
    saveUser.setAttribute("class", "icon-btn fa-solid fa-circle-check");
    nameIn.value = localStorage["name"];
    emailIn.value = localStorage["email"];
    newPass.value = localStorage["password"];
    saveUser.addEventListener("click", editUserTwo)
}

let editUserTwo = () => {
    let id = embedID.value;

    let guest = {
        "id": id,
        "host": false,
        "name": nameIn.value,
        "email": emailIn.value,
        "password": newPass.value,
        "active": true,
        "attend": attend,
        "accomd": stay,
        "park": park
    }

    axios.put(`http://localhost:8080/update?id=${id}`, guest)

    saveUser.setAttribute ("class", "invisible no-space");
    settingsBtn.disabled = false;
    nameIn.disabled = true;
    emailIn.disabled = true;
    newPass.disabled = true;
}

let startScripts = () => {
    embedID.value = localStorage["userID"];
    shareDetails();
    importUser();
}

settingsBtn.addEventListener("click", editUser);
