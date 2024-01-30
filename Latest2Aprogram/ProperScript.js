//   < !--theme script-- >
const themes = [
    document.getElementById("theme-1"),
    document.getElementById("theme-2"),
    document.getElementById("theme-3"),
    document.getElementById("theme-4"),
    document.getElementById("theme-5")
];

const mainContainer = document.querySelector('.main-container');
const btnCustom = document.querySelectorAll('.btn-custom');
const buttons = document.querySelectorAll(".buttons button");
const topHeading = document.getElementById("top-heading");
const progressBar = document.querySelector(".indicator");
const circles = document.querySelectorAll(".circle");
const stepperBox = document.getElementById("steppers");

function removeClassActive() {
    themes.forEach(theme => theme.classList.remove("theme-active"));
}

function changeColor(color,secondColor) {
    topHeading.style.color = color;
    topHeading.style.boxShadow = `1px 1px 5px ${secondColor}`;

    document.querySelectorAll("input, select").forEach(element => {
        element.style.border = `2px solid ${color}`;
    });

    mainContainer.style.boxShadow = `1px 1px 5px ${secondColor}`;

    btnCustom.forEach(btn => {
        btn.classList.remove("btn-black");
        btn.style.backgroundColor = color;
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

themes.forEach((theme,index) => {
    theme.addEventListener("click",() => {
        removeClassActive();
        theme.classList.add("theme-active");
        const themeColors = [
            ["black",'#adb5bd'],
            ["#012a4a",'#89c2d9'],
            ["#38040e","#bd535a"],
            ["#3c096c","#c77dff"],
            ["#891180","#EEA1EB"]
        ];
        changeColor(...themeColors[index]);
    });
});

// <!--form validation script-- >

function checkTextInputValid(input) {
    // let isValid = false;
    const multipleWordsRegex = /\s+/;
    const numberAndSymbolRegex = /[0-9!@#$%^&*(),.?":{}|<>_+=\-[\]\\';`~/]/;
    const addressRegex = /^[0-9a-zA-Z\s.,#\-]+$/;
    const symbolsRegex = /^[a-zA-Z\s.,#\-"|_']*(?:\[\])?[a-zA-Z\s.,#\-"|_']*$/;

    if(input.value == null || input.value == "") {
        return "Field is required";
    }
    else if(input.value.length <= 2) {
        return "Must have more than 2 characters !"
    }
    else if(input.id == "last_name" || input.id == "first_name") {
        console.log(input.value.trim().split(" "));
        if(multipleWordsRegex.test(input.value.trim())) {
            return "please don't use multiple words ";
        } else if(numberAndSymbolRegex.test(input.value.trim())) {
            return "please don't use special character's & numbers ";
        }
        // return input.value.trim().split(" ").length > 1;
    }
    else if(input.id == 'Address' || input.id == 'Address2' || input.id == 'state') {
        if(!addressRegex.test(input.value.trim())) {
            console.log(!addressRegex.test(input.value.trim()));
            return "please don't use special character's & numbers ";
        }
    } else if((input.id == 'technical-skill' || input.id == 'Soft-skills:')) {
        if(input.value.trim().split("").filter(val => val.match(symbolsRegex)).length == 0) {
            return " Please enter a valid skills ! "
        }
    } else if(numberAndSymbolRegex.test(input.value.trim())) {
        return "please don't use special character's & numbers ";
    }
    else {

        return null;
    }

}

function urlValid(value) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if(value.value == "" || value.value == null) {
        return "URL is required !";
    }
    else if(urlRegex.test(value.value)) {
        return null;
    } else {
        return "please fill a valid url";
    }
}

function phoneNumberValid(input) {
    if(input.id == 'mob-no' || input.id == 'Emergency-contact-number') {
        const urlRegex = /[0-9]/i;

        if(input.value == null || input.value == "") {
            return "Number is required !"
        }
        else if(input.value.split("").filter((value) => !value.match(urlRegex)).length == 0 && input.value.length < 10) {
            return "Number must have 10 digits";
        }
        else if(input.value.length > 10 && input.value.split("").filter((value) => !value.match(urlRegex)).length == 0) {
            return "Number can'nt contain more then 10 digits";

        }
        else if(input.value.split("").filter((value) => value.match(/[a-zA-Z!@#$%^&*(),.?":{}|<>_+=\-[\]\\';`~/]/i)).length) {
            console.log("alpha present")
            return "Please don't use special characters !";
        }
        else {
            console.log("value is null return");
            return null
        }
    }
}
function emailValid(input) {
    console.log(input.value.length > 1 && !input.value.includes("@"),"const @");
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const symbolsRegex = /[!@#$%^&*(),.?":{}|<>_+=\-[\]\\';`~/]/;
    if(input.value == null || input.value == "") {
        return "email is required !"
    }
    else if(input.value[0].match(symbolsRegex)) {
        console.log("matched char email first");

        return "Email first letter can'nt be symbol ! "
    }
    else if(input.value.length > 0 && !input.value.includes("@")) {
        console.log(" must contain @ ");
        return "Email must have @ symbol !";
    }
    else if(input.value.split("@")[1].length < 3 && !symbolsRegex.test(input.value.split('@')[1])) {
        return "email must 3 letter after @ symbol ! "
    }
    else if(input.value.split("@")[1].length >= 3 && !symbolsRegex.test(input.value.split('@')[1])) {
        return "email must have . symbol !";
    }
    else if(input.value.split(".")[input.value.split(".").length - 1].length < 3) {
        return "email must 3 letter after . symbol ! "

    }
    else if(!emailRegex.test(input.value)) {
        return "email can only @ and . symbol !"
    } else {
        return null;
    }
}

function dateValid(input) {
    let currentDate = new Date();
    let inputDate = new Date(input.value);
    let minDate = new Date(currentDate);
    minDate.setFullYear(currentDate.getFullYear() - 18);
    console.log("date changed wrong");
    if(input.value == null || input.value == "") {
        return "date of birth is required !"
    }
    else if(inputDate >= currentDate || inputDate > minDate) {
        console.log("date changed wrong");
        return 'DOB should be at least 18 year ago.';
    } else {
        return null;
    }

}


function numberTypeValidation(input) {
    console.log(input.getAttribute("min"));
    if(input.value == null || input.value == "") {
        return "Field is required !"
    } else if(input.id == 'Graduation-year') {
        if(input.value == null || input.value == "") {
            return "Graduation year is required !";
        }
        else if(input.value < +input.getAttribute("min")) {
            return `Year must be more then ${input.getAttribute("min")}.`;
        }
        else if(input.value > +input.getAttribute("max") && input.value < +input.getAttribute("max") + 2000) {
            return `Year must be less then ${input.getAttribute("max")}.`;
        }

        else if(!input.validity.valid) {
            return "please enter a valid year";
        }
    } else if(input.id == 'Percentage') {
        if(input.value == null || input.value == "") {
            return "Percentage is required !";
        }
        else if(input.value < +input.getAttribute("min")) {
            return `Percentage must be more then ${input.getAttribute("min")}.`;
        }
        else if(input.value > +input.getAttribute("max") && input.value < +input.getAttribute("max") + 600) {
            return `Percentage must be less then ${input.getAttribute("max")}.`;
        }
        else if(!input.validity.valid) {
            return "please enter a valid Percentage";
        }
    }
    else if(input.id == 'zip-code') {
        if(input.value == null || input.value == "") {
            return "ZIP code is required !";
        }
        else if(input.value < +input.getAttribute("min")) {
            return `ZIP must be more then ${input.getAttribute("min")}.`;
        }
        else if(input.value > +input.getAttribute("max") && input.value < +input.getAttribute("max") + 5000) {
            return `ZIP must be less then ${input.getAttribute("max")}.`;
        }
        else if(!input.validity.valid) {
            return "please enter a valid ZIP code !";
        }
    }
    else {
        return null;
    }
}

function selectValid(select) {

    if(select.value == null || select.value == "") {
        return "Please select an option !";
    } else {
        return null;
    }
}

function addErrorShowText(value,parentElement,inputValidation) {
    value.style.border = "2px solid red";
    const p = document.createElement("span");
    p.classList.add("input-error");

    // p.textContent = `enter a valid ${value.id}`
    p.textContent = `${inputValidation}`

    parentElement.appendChild(p);
}
function removeErrorShowText(value,parentElement,color) {
    value.style.border = `2px solid ${color}`;
    let p = parentElement.lastElementChild;
    if(p.classList.contains("input-error")) {
        parentElement.lastElementChild.remove();
    }
}

function addInputValidations(arrayInputs) {
    // by default all are valid data
    let inputValidFlag = true;
    arrayInputs.forEach(value => {
        const parentElement = value.parentElement;
        const color = document.getElementById("top-heading").style.backgroundColor;

        if(value.type == "text") {
            value.addEventListener("focus",(e) => {
                removeErrorShowText(value,parentElement,color);
                const flag = checkTextInputValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;
                }


            });

            value.addEventListener("keyup",(e) => {
                removeErrorShowText(value,parentElement,color)
                const flag = checkTextInputValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;
                }


            });
        } else if(value.type == "url") {
            value.addEventListener("focus",(e) => {
                removeErrorShowText(value,parentElement,color)
                const flag = urlValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;

                }
            });
            value.addEventListener("keyup",(e) => {
                removeErrorShowText(value,parentElement,color)
                const flag = urlValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;

                }
            });
        }
        else if(value.type == "tel") {
            value.addEventListener("focus",() => {
                removeErrorShowText(value,parentElement,color);

                const flag = phoneNumberValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;

                }

            });
            value.addEventListener("keyup",() => {
                removeErrorShowText(value,parentElement,color);

                const flag = phoneNumberValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;

                }

            });
        }
        else if(value.type == "email") {
            value.addEventListener("focus",() => {
                removeErrorShowText(value,parentElement,color);
                const flag = emailValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;

                }
            });
            value.addEventListener("keyup",() => {
                removeErrorShowText(value,parentElement,color);
                const flag = emailValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;

                }
            });
        }
        else if(value.type == 'date') {

            console.log("date changed wrong");
            value.addEventListener("focus",(e) => {
                removeErrorShowText(value,parentElement,color);

                const flag = dateValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;
                }
            });
            value.addEventListener("keyup",(e) => {
                removeErrorShowText(value,parentElement,color);

                const flag = dateValid(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;
                }
            });

        }
        else if(value.type == 'number') {
            console.log("================ please check numbers are not have any validation =================")
            value.addEventListener("focus",() => {
                removeErrorShowText(value,parentElement,color);
                let flag = numberTypeValidation(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;
                }
            });
            value.addEventListener("keyup",() => {
                removeErrorShowText(value,parentElement,color);
                let flag = numberTypeValidation(value);
                if(flag) {
                    addErrorShowText(value,parentElement,flag);
                    inputValidFlag = false;
                }

            });
        }
    });
    return inputValidFlag;
}

function addSelectValidations(arrSelects) {
    let selectsValid = true;
    arrSelects.forEach((value) => {
        const parentElement = value.parentElement;
        const color = document.getElementById("top-heading").style.backgroundColor;
        value.addEventListener("focus",() => {
            removeErrorShowText(value,parentElement,color);
            const flag = selectValid(value);
            if(flag) {
                addErrorShowText(value,parentElement,flag);
                selectsValid = false;
            }
        });
        value.addEventListener("change",() => {
            removeErrorShowText(value,parentElement,color);
            const flag = selectValid(value);
            if(flag) {
                addErrorShowText(value,parentElement,flag);
                selectsValid = false;
            }
        });
        value.addEventListener("keyup",() => {
            removeErrorShowText(value,parentElement,color);
            const flag = selectValid(value);
            if(flag) {
                addErrorShowText(value,parentElement,flag);
                selectsValid = false;
            }
        });
    });
    return selectsValid;
}

function addAllValidation() {
    // const form = document.getElementById("education-form");
    const inputs = document.getElementsByTagName("input");
    const selects = document.getElementsByTagName("select");
    const arrSelects = Array.from(selects);
    const arrayInputs = Array.from(inputs);

    // add all input validations
    addInputValidations(arrayInputs);
    // add all select validations

    addSelectValidations(arrSelects);

}

function checkAllAreValid(arrayInputs,arrSelects) {
    let inputValidFlag = true;
    arrayInputs.forEach(value => {
        const parentElement = value.parentElement;
        const color = document.getElementById("top-heading").style.backgroundColor;

        if(value.type == "text") {
            // value.addEventListener("change",(e) => {
            removeErrorShowText(value,parentElement,color)
            const flag = checkTextInputValid(value);
            if(flag) {
                addErrorShowText(value,parentElement,flag);
                inputValidFlag = false;
            }

            // });
        } else if(value.type == "url") {
            // value.addEventListener("change",(e) => {
            removeErrorShowText(value,parentElement,color)
            const flag = urlValid(value);
            if(flag) {
                addErrorShowText(value,parentElement,flag);
                inputValidFlag = false;

            }
            // });
        }
        else if(value.type == "tel") {
            // value.addEventListener("change",() => {
            removeErrorShowText(value,parentElement,color);

            const flag = phoneNumberValid(value);
            if(flag) {
                addErrorShowText(value,parentElement,flag);
                inputValidFlag = false;

            }

            // });
        }
        else if(value.type == "email") {
            // value.addEventListener("change",() => {
            removeErrorShowText(value,parentElement,color);
            const flag = emailValid(value);
            if(flag) {
                addErrorShowText(value,parentElement,flag);
                inputValidFlag = false;

            }
            // if(value.type == "email") {
            //     addErrorShowText(value,parentElement,"Please enter a valid email");
            // }

            // })
        }
        else if(value.type == 'date') {

            console.log("date changed wrong");
            // value.addEventListener("change",(e) => {
            const flag = dateValid(value);
            if(flag) {
                addErrorShowText(value,parentElement,flag);
                inputValidFlag = false;

            }
            // });


        }
        else if(value.type == 'number') {
            // value.addEventListener("change",() => {
            console.log("================ please check numbers are not have any validation =================")
            // addErrorShowText(value,parentElement,"this field is number not any validation added");
            // inputValidFlag = false;

            // })
        }
    });
    let selectsValid = true;
    arrSelects.forEach((value) => {
        const parentElement = value.parentElement;
        const color = document.getElementById("top-heading").style.backgroundColor;
        // value.addEventListener("change",() => {
        removeErrorShowText(value,parentElement,color);
        const flag = selectValid(value);
        if(flag) {
            addErrorShowText(value,parentElement,flag);
            selectsValid = false;
        }
        // });
    });
    console.log("inputs flag ",inputValidFlag," select flags ",selectsValid);
    if(selectsValid && inputValidFlag) {

        return true;
    }
    return false;
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
        // const color = document.getElementById("top-heading").style.backgroundColor;
        const allInputs = Array.from(document.querySelectorAll(`#${idOfBoxes[count]} input`));
        const allSelect = Array.from(document.querySelectorAll(`#${idOfBoxes[count]} select`));
        // let invalidArray = allInputs.filter((value,index) => {

        // });
        // const invalidAllSelect = allSelect.filter((select,index) => {
        //     if(select.value == "") {
        //         const parentElement = select.parentElement;
        //         if(!isAlreadyShowingError(parentElement)) {
        //             addErrorShowText(select,parentElement);
        //         }
        //         // select.validity.valid = false;

        //         return true;
        //     }
        // });

        let flag;

        // check all inside count div is valid 
        flag = checkAllAreValid(allInputs,allSelect);

        // console.log(invalidArray)
        // if(invalidArray.length == 0 && invalidAllSelect.length == 0) {
        console.log("flag for next step ",flag);
        if(flag) {
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


// ==================== code for stepper ======================

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



document.getElementById("submit-btn").addEventListener("click",() => {
    onSubmitClick();
});

function onSubmitClick() {
    const allInputs = Array.from(document.querySelectorAll(`#${idOfBoxes[count]} input`));
    const allSelect = Array.from(document.querySelectorAll(`#${idOfBoxes[count]} select`));

    let flag;

    // check all inside count div is valid 
    flag = checkAllAreValid(allInputs,allSelect);
    if(flag) {
        console.log("submitting successfully because valid");
        console.log("submit called and count is  ",count);
        const currentDiv = document.getElementById(`${idOfBoxes[count]}`);
        currentDiv.classList.remove("d-flex");
        currentDiv.classList.add("d-none");
        const submit = document.getElementById("submit-success");
        submit.classList.add("d-block");
        submit.classList.remove("d-none");
    } else {
        console.log("submitting successfully because valid");

    }

}



addAllValidation();