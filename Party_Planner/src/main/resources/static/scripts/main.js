'use strict'

let logoutBtn = document.querySelector("#logout");

let logout = () => {
    window.location.replace("../index.html")
}

let checkSetup = () =>{
    axios.get("http://localhost:8080/viewAll")
    .then (res => {
        let results = res.data;
        let resultsArray = new Array();
        for (let result of results) {
            resultsArray.push(result);
        }
        if (resultsArray.length < 1) {
            window.location.replace("../pages/starter.html")
        }
    }).catch( err => { console.log(err); })
}

logoutBtn.addEventListener("click", logout);