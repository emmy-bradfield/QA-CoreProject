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

let editModal = document.querySelector("#editModal");

let inputOne;
let inputTwo;

let printResults = (result) => {
    let newAccordian = document.createElement("div");
    newAccordian.setAttribute("class", "accordion-item");

    let guestName = document.createElement("h2");
    guestName.setAttribute("class", "accordion-header");

    let accordianBody = document.createElement("div");
    accordianBody.setAttribute("class", "accordion-collapse collapse");
    accordianBody.setAttribute("id", `guest-${result.id}`);

    let guestDetails = document.createElement("div");
    guestDetails.setAttribute("class", "accordion-body");

    let responseDetails = document.createElement("ul");
    let itemOne = document.createElement("li");
    let itemTwo = document.createElement("li");
    let itemThree = document.createElement("li");

    let expandGuest = document.createElement("button");
    expandGuest.setAttribute("data-bs-toggle", "collapse");
    expandGuest.setAttribute("data-bs-target", `#guest-${result.id}`);
    expandGuest.setAttribute("class", "accordion-button collapsed");

    let editGuest = document.createElement("button");
    editGuest.setAttribute("class", "icon-btn fa-solid fa-pen-to-square")

    let deleteGuest = document.createElement("button");
    deleteGuest.setAttribute("class", "icon-btn fa-solid fa-trash-can")

    let buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "j-right btn-margin");

    let inputZero = document.createElement("input");
    inputZero.setAttribute("class", "invisible no-space");
    inputZero.setAttribute("id", "inputZero");
    inputZero.value = result.id;
    inputZero.disabled = true;

    let hidePass = document.createElement("input");
    hidePass.setAttribute("class", "invisible no-space");
    hidePass.setAttribute("id", "hidePass");
    hidePass.value = result.password;
    hidePass.disabled = true;

    let inputOne = document.createElement("input");
    inputOne.setAttribute("class", "form-control invisible no-space");
    inputOne.disabled = true;
    inputOne.setAttribute("type", "text");
    let inputTwo = document.createElement("input");
    inputTwo.setAttribute("class", "form-control");
    inputTwo.disabled = true;
    inputTwo.setAttribute("type", "text");
    let saveGuest = document.createElement("button");
    saveGuest.setAttribute("class", "invisible no-space");
    saveGuest.disabled = true;
    saveGuest.setAttribute("style", "margin-left:1em;margin-bottom:1em;")


    if (result.host == true) {
        expandGuest.textContent = `#${result.id} - ${result.name}`;
        itemOne.textContent = `${result.name} is hosting this event`;
        responseDetails.appendChild(itemOne);
        editGuest.disabled;
        deleteGuest.disabled = true;
        deleteGuest.setAttribute("class", "invisible no-space");
    } else {
        expandGuest.textContent = `#${result.id} - ${result.name}`;
        if (result.active != true) {
            responseDetails.textContent = `this user account has not been activated`;
        } else {
            let attend = "✘";
            let stay = "✘";
            let park = "✘";
            if (result.attend == true) {
                attend = "✔";
                if (result.accom == true) {
                    stay = "✔";
                }
                if (result.park == true) {
                    park = "✔";
                }
                itemOne.textContent = `${attend} | Attending`;
                itemTwo.textContent = `${stay} | Staying `;
                itemThree.textContent = `${park} | Parking`;
                responseDetails.appendChild(itemOne);
                responseDetails.appendChild(itemTwo);
                responseDetails.appendChild(itemThree);
            } else {
                itemOne.textContent = `${attend} | Attending`;
                responseDetails.appendChild(itemOne);
            }



        }

    }
    guestDetails.appendChild(inputOne);
    guestDetails.appendChild(inputTwo);

    inputOne.value = result.name;
    inputTwo.value = result.email;

    guestDetails.appendChild(inputZero);
    guestDetails.appendChild(hidePass);

    accordianBody.appendChild(guestDetails);
    accordianBody.appendChild(responseDetails);
    buttonDiv.appendChild(editGuest)
    buttonDiv.appendChild(deleteGuest);
    accordianBody.appendChild(buttonDiv);
    accordianBody.appendChild(saveGuest);
    guestName.appendChild(expandGuest);
    newAccordian.appendChild(guestName);
    newAccordian.appendChild(accordianBody);
    view.appendChild(newAccordian);

    editGuest.addEventListener("click", () => {
        editGuest.setAttribute("class", "invisible no-space");
        editGuest.disabled = true;
        deleteGuest.setAttribute("class", "invisible no-space");
        deleteGuest.disabled = true;
        saveGuest.setAttribute("class", "icon-btn fa-solid fa-circle-check");
        saveGuest.disabled = false;
        accordianBody.appendChild(saveGuest);
        inputTwo.disabled = false;
        inputOne.disabled = false;
        inputOne.setAttribute("class", "form-control");
        saveGuest.addEventListener("click", 
        () => {
            let guest = {
                "name": inputOne.value,
                "email": inputTwo.value,
                "password": hidePass.value
            }

            axios.put(`http://localhost:8080/update?id=${inputZero.value}`, guest)
                .then( () => {
                    inputOne.setAttribute("class", "invisible no-space");
                    inputTwo.disabled = true;
                    saveGuest.disabled = true;
                    saveGuest.setAttribute("class", "invisible no-space");
                    viewAll();
                }).catch(err => { console.log(err); });
        })

    })

    deleteGuest.addEventListener("click", () => {
        axios.delete(`http://localhost:8080/delete?id=${inputZero.value}`)
            .then(() => {
                viewAll()
            }).catch(err => { console.log(err); });
    }
    )
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

            let active = "✘";
            let attend = "✘";
            let stay = "✘";
            let park = "✘";

            if (result.active == true) {
                active = "✔";
                if (attend == true) {
                    attend = "✔";
                }
                if (stay == true) {
                    stay = "✔";
                }
                if (park == true) {
                    park = "✔";
                }
            }
            view.innerHTML = "";
            let tempDiv = document.createElement("div");
            tempDiv.setAttribute("class", "j-right")
            let singleView = document.createElement("ul");
            let refresh = document.createElement("button");
            refresh.setAttribute("class", "btn btn-light btn-margin right-btn fa-solid fa-arrow-rotate-right");
            refresh.addEventListener("click", viewAll)
            tempDiv.appendChild(refresh);
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
            lineOne.textContent = `${active} | Activated Account`
            lineTwo.textContent = `${attend} | Confirmed Attendance`
            lineThree.textContent = `${stay} | Requested Accomodation`
            lineFour.textContent = `${park} | Requested Parking`;

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

let openEditor = () => {
    editBtn.setAttribute("class", "invisible");
    saveBtn.setAttribute("class", "btn btn-light right-btn-2 visible");
    cancelBtn.setAttribute("class", "btn btn-light right-btn-2 visible");
    detailsIn.disabled = false;
    detailsIn.textContent = localStorage['details'];
}

let saveEditor = () => {
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

let startScript = () => {
    viewAll();
    if (localStorage['details'] != null) {
        detailsIn.placeholder = localStorage['details'];
    } else {
        detailsIn.placeholder = "Click edit to start writing your party details!"
    }
}


createBtn.addEventListener("click", create);
viewBtn.addEventListener("click", viewer);

editBtn.addEventListener("click", openEditor);
saveBtn.addEventListener("click", saveEditor);
cancelBtn.addEventListener("click", cancelEditor);