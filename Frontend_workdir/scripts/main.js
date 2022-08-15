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
let detailsDiv = document.querySelector("#detailsDiv")

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

let viewer = () => {
    let id = viewID.value;
    axios.get(`http://localhost:8080/view?id=${id}`)
    .then(res => {
        let result = res.data;
        view.innerHTML="";
        let singleView = document.createElement("ul");
        let refresh = document.createElement("button");
        refresh.setAttribute("class", "btn btn-light right-btn fa-solid fa-arrow-rotate-right");
        refresh.addEventListener("click", viewAll)
        let title = document.createElement("h6");
        let titleTwo = document.createElement("h6");
        let lineOne = document.createElement("li");
        let lineTwo = document.createElement("li");
        let lineThree = document.createElement("li");
        let lineFour = document.createElement("li");
        title.textContent = `Guest #${result.id}: ${result.name}`
        titleTwo.textContent = `(${result.email})`;
        lineOne.textContent = `Is ${result.name}'s account activated | ${result.active}` 
        lineTwo.textContent = `Are they able to attend | ${result.attend}`
        lineThree.textContent = `Do they need accomodation | ${result.accom}`
        lineFour.textContent = ` Do they wish to purchase a parking permit | ${result.park}`;
        
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

let details = () => {
    
}


createBtn.addEventListener("click", create);
updateBtn.addEventListener("click", update);
deleteBtn.addEventListener("click", remove);
viewBtn.addEventListener("click", viewer);