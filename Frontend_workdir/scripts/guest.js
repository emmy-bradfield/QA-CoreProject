'use strict'

let detailsOut = document.querySelector("#detailsOut");
let embedID = document.querySelector("#guestID-hidden");
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

let shareDetails = () => {
    if (localStorage['details'] != null) {
    detailsOut.placeholder = localStorage['details'];
    } else {
        detailsOut.innerHTML="";
        detailsOut.placeholder = "When your host has added event details, they will appear here";
    }
    localStorage.removeItem['details'];
}

let importDetails = () => {
    let id = embedID.value;
    axios.get(`http://localhost:8080/view?id=${id}`)
    .then( res => {
        let user = res.data;
        let name = user.name;
        let email = user.email;
        let attend = user.attend;
        let stay = user.stay;
        let park = user.park;
    })
}

let startScripts = () => {
    shareDetails();
    embedID.value = localStorage["userID"];
}
