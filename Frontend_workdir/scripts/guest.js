'use strict'

let detailsOut = document.querySelector("#detailsOut");
let embedID = document.querySelector("#guestID-hidden")

let shareDetails = () => {
    if (localStorage['details'] != null) {
    detailsOut.placeholder = localStorage['details'];
    } else {
        detailsOut.innerHTML="";
        detailsOut.placeholder = "When your host has added event details, they will appear here";
    }
    localStorage.removeItem['details'];
}

let startScripts = () => {
    shareDetails();
    embedID.value = localStorage["userID"];
}
