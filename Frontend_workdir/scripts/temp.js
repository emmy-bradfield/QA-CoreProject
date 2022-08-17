'use strict'

let printResults = (result) => {
    let subView = document.createElement("div");
    let subView2 = document.createElement("div");
    let listItem = document.createElement("accordian-item");
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

    let editGuest = document.createElement("button");
    let deleteGuest = document.createElement("button");

    editGuest.setAttribute("value", result.id);
    editGuest.setAttribute("class", "icon-btn fa-solid fa-pen-to-square");
    

    deleteGuest.setAttribute("value", result.id);
    deleteGuest.setAttribute("class", "icon-btn fa-solid fa-trash-can")

    let btnDiv = document.createElement("div");
    btnDiv.setAttribute("class", "btn-head");

    btnDiv.appendChild(editGuest);
    btnDiv.appendChild(deleteGuest);
    subView.appendChild(btnDiv);
    listItem.appendChild(subView);
    listItem.appendChild(subView2);

    view.appendChild(listItem);

}