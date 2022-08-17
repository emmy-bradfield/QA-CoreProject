'use strict'

let view = document.querySelector("#view");

let createName = document.querySelector("#createName");
let createEmail = document.querySelector("#createEmail");
let createBtn = document.querySelector("#createBtn");

let updateID = document.querySelector("#updateID");
let updateName = document.querySelector("#updateName");
let updateEmail = document.querySelector("#updateEmail");
let updateBtn = document.querySelector("#updateBtn");

let viewID = document.querySelector("#viewID");
let viewBtn = document.querySelector("#viewBtn");

let deleteID = document.querySelector("#deleteID");
let deleteBtn = document.querySelector("#deleteBtn");

let detailsBtn = document.querySelector("#detailsBtn");
let detailsDiv = document.querySelector("#detailsDiv");

let editBtn = document.querySelector("#editDetails");
let saveBtn = document.querySelector("#saveDetails");
let cancelBtn = document.querySelector("#discard");
let detailsIn = document.querySelector("#detailsIn");

let printResults = (result) => {
    let subView = document.createElement("div");
    let subView2 = document.createElement("div");
    let listItem = document.createElement("div");
    listItem.setAttribute("class", "list-item");
    subView.setAttribute("class", "guest-head");
    subView2.setAttribute("class", "guest-body");

    if (result.host == true) {
        subView.textContent = `#${result.id} - ${result.name} (${result.email}) [host]`;    
    }
    else {
    subView.textContent = `#${result.id} - ${result.name} (${result.email})`;
    }

    if (result.active != true) {
        subView2.textContent = `this user account has not been activated`
    }
    else {
        let attend = "no";
        let stay = "no";
        let park = "no";
        if (result.attend == true) {
            attend = "yes";
        }
        if (result.accom == true) {
            stay = "yes";
        }
        if (result.park == true) {
            park = "yes";
        }

    subView2.textContent = `attending: ${attend} | staying: ${stay} | parking: ${park}`
    }

    listItem.appendChild(subView);
    listItem.appendChild(subView2);

    view.appendChild(listItem);

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

let viewer = () => {
    let id = viewID.value;
    axios.get(`http://localhost:8080/view?id=${id}`)
    .then(res => {
        let result = res.data;

        let active = "no";
        let attend = "no";
        let stay = "no";
        let park = "no";

        if (result.active != true) {
            attend = "n/a - account inactive";
            stay = "n/a - account inactive";
            park = "n/a - account inactive";
        }

        if (result.active == true) {
            active = "yes";
            if (attend == true) {
                attend = "yes";
            }
            if (stay == true) {
                stay = "yes";
            }
            if (park == true) {
                park = "yes";
            }
        }
        view.innerHTML="";
        let singleView = document.createElement("ul");
        let refresh = document.createElement("button");
        refresh.setAttribute("class", "btn btn-light right-btn fa-solid fa-arrow-rotate-right");
        refresh.addEventListener("click", viewAll)
        let title = document.createElement("h6");
        title.setAttribute("class", "guest-head")
        let titleTwo = document.createElement("h6");
        titleTwo.setAttribute("class", "guest-body")
        let lineOne = document.createElement("li");
        let lineTwo = document.createElement("li");
        let lineThree = document.createElement("li");
        let lineFour = document.createElement("li");

        if (result.host == true) {
            title.textContent = `Host: ${result.name}`
        } else {
            title.textContent = `Guest #${result.id}: ${result.name}`
        }

        titleTwo.textContent = `(${result.email})`;
        lineOne.textContent = `Is ${result.name}'s account activated? | ${active} |` 
        lineTwo.textContent = `Have they confirmed attendance? | ${attend} |`
        lineThree.textContent = `Have they requested accomodation? | ${stay} |`
        lineFour.textContent = `Have they requested a parking permit? | ${park} |`;
        
        singleView.appendChild(lineOne);
        singleView.appendChild(lineTwo);
        singleView.appendChild(lineThree);
        singleView.appendChild(lineFour);
        view.appendChild(title);
        view.appendChild(titleTwo);
        view.appendChild(singleView);
        view.appendChild(refresh);
    })
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

let openEditor = () =>{
    editBtn.setAttribute("class", "invisible");
    saveBtn.setAttribute("class", "btn btn-light right-btn-2 visible");
    cancelBtn.setAttribute("class", "btn btn-light right-btn-2 visible");
    detailsIn.disabled = false;
    detailsIn.textContent = localStorage['details'];
}

let saveEditor = () =>{
    localStorage.removeItem('details');
    let partyDetails = detailsIn.value;
    localStorage.setItem("details", partyDetails);
    editBtn.setAttribute("class", "btn btn-light right-btn-2");
    saveBtn.setAttribute("class", "invisible no-space");
    cancelBtn.setAttribute("class", "invisible no-space");
    detailsIn.placeholder = partyDetails;
    detailsIn.disabled = true;
}

let cancelEditor = () => {
    detailsIn.value = "";
    editBtn.setAttribute("class", "btn btn-light right-btn-2");
    saveBtn.setAttribute("class", "invisible no-space");
    cancelBtn.setAttribute("class", "invisible no-space");
    detailsIn.disabled = true;
}

let startScript = () =>{
    viewAll();
    if (localStorage['details'] != null) {
        detailsIn.placeholder = localStorage['details'];
    } else {
        detailsIn.placeholder = "Click edit to start writing your party details!"
    }
}


createBtn.addEventListener("click", create);
updateBtn.addEventListener("click", update);
deleteBtn.addEventListener("click", remove);
viewBtn.addEventListener("click", viewer);

editBtn.addEventListener("click", openEditor);
saveBtn.addEventListener("click", saveEditor);
cancelBtn.addEventListener("click", cancelEditor);