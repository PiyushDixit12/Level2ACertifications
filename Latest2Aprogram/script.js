//   < !--theme script-- >

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
    const progressBar = document.querySelector(".indicator");
    const arrInputs = Array.from(inputs);
    const arrSelect = Array.from(select);
    const arrMainContainer = Array.from(mainContainer);
    const arrBtnCustom = Array.from(btnCustom);
    const circles = Array.from(document.querySelectorAll(".circle"));
    const stepperBox = document.getElementById("steppers");
    topHeading.style.color = color;
    topHeading.style.boxShadow = `1px 1px 5px ${secondColor}`;
    arrInputs.forEach(value => {
        value.style.border = `2px solid ${color}`;
        // value.style.outline = `1px solid ${color}`;
    });
    arrSelect.forEach(value => {
        value.style.border = `2px solid ${color}`;
        // value.style.outline = `1px solid ${color}`;
    });
    arrMainContainer.forEach(value => {
        value.style.boxShadow = `1px 1px 5px ${secondColor}`;
    });
    arrBtnCustom.forEach(value => {
        console.log(value);
        value.classList.remove("btn-black");
        value.style.backgroundColor = `${color}`
    });
    stepperBox.style.boxShadow = `1px 1px 5px ${secondColor}`;
    circles.forEach(circle => {
        if(circle.classList.contains('active')) {
            circle.style.border = `3px solid ${color}`;
            circle.style.color = color;
        }
        progressBar.style.backgroundColor = color;

    });
}
// function changeScrollingColor(color,secondColor) {
//     var scrollableContainer = Array.from(document.getElementsByClassName('main-container'));
//     scrollableContainer.forEach(scrollable => {
//         scrollable.style.scrollbarWidth = 'thin'; // Set scrollbar width
//         scrollable.style.scrollbarColor = `${color} ${secondColor}`; // Set scrollbar color

//         // Set scrollbar track color using pseudo-element
//         scrollable.style.cssText += `
//             scrollbar-track-color: ${color};
//             scrollbar-thumb-color: ${secondColor};
//         `;
//     });
// }

theme1.addEventListener("click",(e) => {
    removeClassActive();
    theme1.classList.add("theme-active");
    // changeColor("#716a6a", '#adb5bd');
    changeColor("black",'#adb5bd');
    // changeScrollingColor("black",'#adb5bd');


});
theme2.addEventListener("click",(e) => {
    removeClassActive();
    theme2.classList.add("theme-active");

    changeColor("#012a4a",'#89c2d9');
    // changeScrollingColor("#012a4a",'#89c2d9');
});
theme3.addEventListener("click",(e) => {
    removeClassActive();
    theme3.classList.add("theme-active");

    changeColor("#38040e","#bd535a");
    // changeScrollingColor("#38040e","#bd535a");

});
theme4.addEventListener("click",(e) => {
    removeClassActive();
    theme4.classList.add("theme-active");

    changeColor("#3c096c","#c77dff");
    // changeScrollingColor("#3c096c","#c77dff");

});
theme5.addEventListener("click",(e) => {
    removeClassActive();
    theme5.classList.add("theme-active");

    changeColor("#891180","#EEA1EB");
    // changeScrollingColor("#891180","#EEA1EB");

});


// <!--form validation script-- >

function checkTextInputValid(value) {

    if(value == null || value == "") {
        return 0;
    } else {
        return value.split("").filter(val => {
            return !val.match(/[a-zA-Z]/i);
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
    } else if(inputValidation && inputValidation.length) {
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
    // const form = document.getElementById("education-form");
    const inputs = document.getElementsByTagName("input");
    const selects = document.getElementsByTagName("select");
    const arrSelects = Array.from(selects);
    const arrayInputs = Array.from(inputs);
    arrayInputs.forEach(value => {
        const parentElement = value.parentElement;
        const color = document.getElementById("top-heading").style.backgroundColor;
        if(value.type == "text") {
            value.addEventListener("change",(e) => {
                // const flag = checkTextInputValid(value.value);
                const multipleWordsRegex = /\s+/;
                const numberAndSymbolRegex = /[0-9!@#$%^&*(),.?":{}|<>_+=\-[\]\\';`~/]/;

                if(value.id === 'first_name' || value.id === 'last_name') {
                    if(multipleWordsRegex.test(value.value.trim())) {
                        if(isAlreadyShowingError(parentElement)) {
                            removeErrorShowText(value,parentElement,color);
                        }
                        addErrorShowText(value,parentElement,`${value.id} should be in one word.`);
                    }
                    value.validity.valid = false;
                }
                //  else if(!flag) {
                //     removeErrorShowText(value,parentElement,color);
                // }
                else if(numberAndSymbolRegex.test(value.value.trim())) {
                    if(!isAlreadyShowingError(parentElement)) {
                        addErrorShowText(value,parentElement," please don't use number & special characters");
                        value.validity.valid = false;

                    }
                }
                else if(value.value.length < 2) {
                    if(isAlreadyShowingError(parentElement)) {
                        removeErrorShowText(value,parentElement,color)
                    }
                    addErrorShowText(value,parentElement," please enter more than 2 characters");
                }
                else {
                    removeErrorShowText(value,parentElement,color);
                    value.validity.valid = true;

                }





                // if(!input.value.trim()) {
                //     displayErrorMessage(input,`This field is required.`);
                // } else if(numberAndSymbolRegex.test(input.value.trim())) {
                //     displayErrorMessage(input,`Numbers and symbols are not allowed.`);
                // } else if(input.id === 'firstName' || input.id === 'lastName') {
                //     if(multipleWordsRegex.test(input.value.trim())) {
                //         displayErrorMessage(input,`Please enter a ${input.name}.`);
                //     } else {
                //         isValid = true;
                //     }
                // } else {
                //     isValid = true;
                // }
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
        } else if(value.type == "tel" || value.type == "email" || value.type == 'number') {
            value.addEventListener("change",() => {
                if(value.validity.valid) {
                    removeErrorShowText(value,parentElement,color);
                } else {
                    if(!isAlreadyShowingError(parentElement)) {
                        if(value.type == 'tel') {
                            const urlRegex = /[0-9]/i;
                            console.log(urlRegex.test(value.value.split("")));
                            console.log(value.value.split("").filter((value) => !value.match(urlRegex)));
                            console.log("value length",value.value.length)
                            if(value.value.split("").filter((value) => !value.match(urlRegex)).length == 0 && value.value.length < 10) {
                                if(isAlreadyShowingError(parentElement)) {
                                    removeErrorShowText(value,parentElement,color);
                                }
                                addErrorShowText(value,parentElement,"Number must have 10 digits");
                            }
                            else if(value.value.length > 10 && value.value.split("").filter((value) => !value.match(urlRegex)).length == 0) {
                                addErrorShowText(value,parentElement,"Number can'nt contain more then 10 digits");

                            }
                            else {
                                console.log("value is alpha")
                                if(isAlreadyShowingError(parentElement)) {
                                    removeErrorShowText(value,parentElement,color);
                                }
                                addErrorShowText(value,parentElement,"Please don't use special characters !");

                            }
                        } else if(value.type == "email") {
                            addErrorShowText(value,parentElement,"Please enter a valid email");
                        }
                        else {
                            addErrorShowText(value,parentElement);
                        }
                    }
                }
            })
        } else if(value.type == 'date') {

            console.log("date changed wrong");
            value.addEventListener("change",(e) => {
                let currentDate = new Date();
                let inputDate = new Date(value.value);

                let minDate = new Date(currentDate);
                minDate.setFullYear(currentDate.getFullYear() - 18);
                console.log("date changed wrong");

                if(inputDate >= currentDate || inputDate > minDate) {
                    console.log("date changed wrong");
                    if(!isAlreadyShowingError(parentElement)) {
                        addErrorShowText(value,parentElement,'DOB should be at least 18 year ago.');
                    }
                } else {
                    console.log("value is true");
                    removeErrorShowText(value,parentElement,color);
                }
            });


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
        let invalidArray = allInputs.filter((value,index) => {
            if(value.value == "" || value.validity.valid == false) {
                const parentElement = value.parentElement;
                if(!isAlreadyShowingError(parentElement)) {
                    addErrorShowText(value,parentElement);
                }
                // value.validity.valid = false;

                return true;
            }
            if(value.type == 'text') {

                return checkTextInputValid(value.value);
            }

        });
        const invalidAllSelect = allSelect.filter((select,index) => {
            if(select.value == "") {
                const parentElement = select.parentElement;
                if(!isAlreadyShowingError(parentElement)) {
                    addErrorShowText(select,parentElement);
                }
                // select.validity.valid = false;

                return true;
            }
        });
        console.log(invalidArray)
        if(invalidArray.length == 0 && invalidAllSelect.length == 0) {
            const divToBlock = document.getElementById(idOfBoxes[count + 1]);
            // divToBlock.style.display = 'block';
            divToBlock.classList.add('d-flex');
            divToBlock.classList.remove('d-none');

            const divToNone = document.getElementById(idOfBoxes[count]);
            divToNone.classList.remove('d-flex');
            divToNone.classList.add('d-none');
            // count += 1;

            console.log(count)
            updateSteps(e);
        }
    }
}

function moveToPrevious(e) {
    console.log(count)
    const currentDiv = document.getElementById(`${idOfBoxes[count]}`);

    const previousDiv = document.getElementById(`${idOfBoxes[count - 1]}`);

    console.log("current dic ",currentDiv,"previous div",previousDiv);
    console.log("id of current",idOfBoxes[count],"id of previous",idOfBoxes[count - 1]);
    currentDiv.classList.remove("d-flex");
    currentDiv.classList.add("d-none");
    previousDiv.classList.remove("d-none");
    previousDiv.classList.add("d-flex");
    console.log("Previous called =============");

    updateSteps(e);
}

function onSubmit(params) {

}

// ==================== code for stepper ======================
const topHeading = document.getElementById("top-heading")
const buttons = document.querySelectorAll(".buttons button");
const circles = document.querySelectorAll(".circle");
const progressBar = document.querySelector(".indicator");
// let count = 1;

const updateSteps = (e) => {
    console.log("event called");
    count = e.target.id === 'next' ? ++count : --count;
    console.log("step",count);
    circles.forEach((circle,index) => {
        circle.classList[`${index <= count ? 'add' : 'remove'}`]("active");
    });
    progressBar.style.width = `${((count) / (circles.length - 1)) * 100}%`;
    if(count === circles.length) {
        buttons[1].disabled = true;
    } else if(count === 0) {
        buttons[0].disabled = true;
    }
    else {
        buttons.forEach(button => button.disabled = false);
    }

    circles.forEach(circle => {
        circle.style.color = topHeading.style.color;
        if(circle.classList.contains("active")) {
            circle.style.border = `3px solid ${topHeading.style.color}`;
            progressBar.style.backgroundColor = topHeading.style.color;
        } else {
            circle.style.border = `3px solid gainsboro`;
        }

    })
    console.log("event ended");
};



personalInformationValidation();
