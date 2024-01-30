
const theme1 = document.getElementById("theme-1");
const theme2 = document.getElementById("theme-2");
const theme3 = document.getElementById("theme-3");
const theme4 = document.getElementById("theme-4");
const theme5 = document.getElementById("theme-5");

function removeClassActive() {
    theme1.classList.remove("theme-active");
    theme2.classList.remove("theme-active");
    theme3.classList.remove("theme-active");
    theme4.classList.remove("theme-active");
    theme5.classList.remove("theme-active");

}

function changeColor(color,secondColor) {
    const inputs = document.getElementsByTagName("input");
    const select = document.getElementsByTagName("select");
    const mainContainer = document.getElementsByClassName('main-container');
    const btnCustom = document.getElementsByClassName('btn-custom');
    const topHeading = document.getElementById("top-heading");
    const arrInputs = Array.from(inputs);
    const arrSelect = Array.from(select);
    const arrMainContainer = Array.from(mainContainer);
    const arrBtnCustom = Array.from(btnCustom);
    arrInputs.forEach(value => {
        value.style.border = `2px solid ${color}`;
        // value.style.outline = `1px solid ${color}`;
    });
    arrSelect.forEach(value => {
        value.style.border = `2px solid ${color}`;
        // value.style.outline = `1px solid ${color}`;
    });
    arrMainContainer.forEach(value => {
        value.style.boxShadow = `1px 1px 10px ${color}`;
    });
    arrBtnCustom.forEach(value => {
        value.style.backgroundColor = `${color}`
    });
    topHeading.style.backgroundColor = `${color}`;
    // document.body.style.backgroundImage = `linear-gradient(90deg,${color}, ${secondColor})`;
}

theme1.addEventListener("click",(e) => {
    removeClassActive();
    theme1.classList.add("theme-active");
    // changeColor("#716a6a", '#F1EFEF');
    changeColor("black",'#F1EFEF');

});
theme2.addEventListener("click",(e) => {
    removeClassActive();
    theme2.classList.add("theme-active");

    changeColor("#7F7FD5",'#91EAE4');
});
theme3.addEventListener("click",(e) => {
    removeClassActive();
    theme3.classList.add("theme-active");

    changeColor("#0F3443","#34E89E");
});
theme4.addEventListener("click",(e) => {
    removeClassActive();
    theme4.classList.add("theme-active");

    changeColor("#333399","#FF00CC");
});
theme5.addEventListener("click",(e) => {
    removeClassActive();
    theme5.classList.add("theme-active");

    changeColor("#891180","#EEA1EB");
});



function checkTextInputValid(value) {

    if(value == null || value == "") {
        return 0;
    } else {
        return value.split("").filter(val => {
            return val.match(/[0-9]/i);
        }).length;
    }

}

function urlValid(value) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if(urlRegex.test(value)) {
        return true;
    } else {
        return false;
    }
}

function addErrorShowText(value,parentElement,inputValidation) {
    value.style.border = "2px solid red";
    const p = document.createElement("span");
    p.classList.add("input-error");
    let validation = "";
    if(value.value == "") {
        validation = "field is required";
    } else if(inputValidation) {
        validation = `${inputValidation}`;
    } else {
        validation = `please fill a valid ${value.id}`;

    }

    // p.textContent = `enter a valid ${value.id}`
    p.textContent = `${validation}`

    parentElement.appendChild(p);
}

function removeErrorShowText(value,parentElement,color) {
    value.style.border = `2px solid ${color}`;
    let p = parentElement.lastElementChild;
    if(p.classList.contains("input-error")) {
        parentElement.lastElementChild.remove();
    }
}

function isAlreadyShowingError(parentElement) {
    let p = parentElement.lastElementChild;
    if(p.classList.contains("input-error")) {
        parentElement.lastElementChild.remove();
    }
}

function personalInformationValidation() {
    const form = document.getElementById("education-form");
    const inputs = document.getElementsByTagName("input");
    const selects = document.getElementsByTagName("select");
    const arrSelects = Array.from(selects);
    const arrayInputs = Array.from(inputs);
    arrayInputs.forEach(value => {
        const parentElement = value.parentElement;
        const color = document.getElementById("top-heading").style.backgroundColor;
        if(value.type == "text") {
            value.addEventListener("change",(e) => {
                const flag = checkTextInputValid(value.value);
                if(!flag) {
                    removeErrorShowText(value,parentElement,color);
                } else {
                    if(!isAlreadyShowingError(parentElement)) {
                        addErrorShowText(value,parentElement," please don't use number & special characters ");
                    }
                }

            });
        } else if(value.type == "url") {
            value.addEventListener("change",(e) => {
                const flag = urlValid(value.value);
                if(flag) {
                    // url is correct 
                    removeErrorShowText(value,parentElement,color);
                } else {
                    if(!isAlreadyShowingError(parentElement)) {
                        addErrorShowText(value,parentElement);
                    }
                }
            });
        } else if(value.type == "tel" || value.type == "email" || value.type == 'date') {
            value.addEventListener("change",() => {
                if(value.validity.valid) {
                    removeErrorShowText(value,parentElement,color)
                } else {
                    if(!isAlreadyShowingError(parentElement)) {
                        addErrorShowText(value,parentElement);
                    }
                }
            })
        }
    });

    arrSelects.forEach((value) => {
        const parentElement = value.parentElement;
        const color = document.getElementById("top-heading").style.backgroundColor;
        value.addEventListener("change",() => {
            if(value.value == "") {
                if(!isAlreadyShowingError(parentElement)) {
                    addErrorShowText(value,parentElement);
                }
            } else {
                removeErrorShowText(value,parentElement,color)
            }
        });
    });
}


let count = 0;
let arr = [0,1,2,3,4,5,6,7,8,9];
let idOfBoxes = [
    "personal-information",
    "address-information",
    "education-information",
    "skills-and-certification",
    "document-upload-and-web-presence",
    "Learning-Preferences-and-Financial-Information",
    "Emergency-contacts-information",
    "technical-and-professional-details",
    "Professional-networking-and-experience",
    "Mentorship-and-personal-development"
];


function moveToNext(e) {
    if(count != arr.length) {
        const color = document.getElementById("top-heading").style.backgroundColor;
        const allInputs = Array.from(document.querySelectorAll(`#${idOfBoxes[count]} input`));
        const allSelect = Array.from(document.querySelectorAll(`#${idOfBoxes[count]} select`));
        const invalidArray = allInputs.filter((value,index) => {
            if(value.value == "" || value.validity.valid == false) {
                const parentElement = value.parentElement;
                if(!isAlreadyShowingError(parentElement)) {
                    addErrorShowText(value,parentElement);
                }
                value.validity.valid = false;


                return true;
            }
        });
        const invalidAllSelect = allSelect.filter((select,index) => {
            if(select.value == "") {
                const parentElement = select.parentElement;
                if(!isAlreadyShowingError(parentElement)) {
                    addErrorShowText(select,parentElement);
                }
                select.validity.valid = false;

                return true;
            }
        });
        if(invalidArray.length == 0 && invalidAllSelect.length == 0) {
            document.getElementById(idOfBoxes[count + 1]).style.display = 'block';
            document.getElementById(idOfBoxes[count]).style.display = 'none';
            count += 1;
        }
    }
}


personalInformationValidation();
