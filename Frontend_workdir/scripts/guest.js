'use strict'

let detailsOut = document.querySelector("#detailsOut");

let shareDetails = () => {
    if (localStorage['details'] != null) {
    detailsOut.placeholder = localStorage['details'];
    } else {
        detailsOut.innerHTML="";
        detailsOut.placeholder = "When your host has added event details, they will appear here";
    }
    localStorage.removeItem['details'];
}
