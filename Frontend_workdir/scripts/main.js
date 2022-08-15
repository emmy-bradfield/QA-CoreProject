'use strict'

let view = document.querySelector("#view");

let createName = document.querySelector("#createName");
let createEmail = document.querySelector("#createEmail");
let createBtn = document.querySelector("#createBtn");

let updateID = document.querySelector("#updateID");
let updateName = document.querySelector("#updateName");
let updateEmail = document.querySelector("#updateEmail");
let updateBtn = document.querySelector("#updateBtn");

let deleteID = document.querySelector("#deleteID");
let deleteBtn = document.querySelector("#deleteBtn");

let printResults = (result) => {
    let subView = document.createElement("div");
    let subView2 = document.createElement("div");
    subView.textContent = `#${result.id} - ${result.name} (${result.email})`;
    subView2.textContent = `activated: ${result.active} | attending: ${result.attend} | staying: ${result.accom} | parking: ${result.park}`

    view.appendChild(subView);
    view.appendChild(subView2);

}

let create = () => {

    let guest = {
        "name": createName.value,
        "email": createEmail.value
    }

    axios.post("http://localhost:8080/create", guest)
        .then(res => {
            viewAll();
        }).catch(err => { console.log(err); });

}

let viewAll = () => {
    axios.get("http://localhost:8080/viewAll")
        .then(res => {
            view.innerHTML = "";
            let results = res.data;

            for (let result of results) {
                printResults(result);
            }
        }).catch(err => { console.log(err); });
}

let update = () => {
    let id = updateID.value;
    let guest = {
        "name": updateName.value,
        "email": updateEmail.value
    }
    
    axios.put(`http://localhost:8080/update?id=${id}`, guest)
    .then(res => {
        viewAll();
    }).catch(err => { console.log(err); });
}

let remove = () => {
    let id = deleteID.value;
    axios.delete(`http://localhost:8080/delete?id=${id}`)
    .then (res => {
        viewAll()
    }).catch(err => { console.log(err); });
}


createBtn.addEventListener("click", create);
updateBtn.addEventListener("click", update);
deleteBtn.addEventListener("click", remove);