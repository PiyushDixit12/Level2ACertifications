
const name = ["sumit ","Piyush","Harsh ","ranu  "];
const maths = [82,56,67,89];
const english = [70,78,67,69];
const hindi = [78,56,92,89];
let percentageArr = []
function showDataWithPercentage() {

    const ol = document.createElement("ol");
    for(let index = 0; index < name.length; index++) {
        console.log(" Name :  " + name[index]," Maths : " + maths[index]," English : " + english[index]," Hindi : " + hindi[index]," percentage : ",percentageArr[index]);

        // for showing on document
        const li = document.createElement("li");
        const pre = document.createElement("pre");
        pre.textContent = ` Name :  ${name[index]}  Maths :  ${maths[index]}  English : ${english[index]}  Hindi : ${hindi[index]}  percentage : ${percentageArr[index]} `;
        li.appendChild(pre);
        ol.appendChild(li);
    }
    document.body.appendChild(ol);
}

function showData() {
    const ol = document.createElement("ol");
    for(let index = 0; index < name.length; index++) {
        console.log(" Name : " + name[index]," Maths : " + maths[index]," English : " + english[index]," Hindi : " + hindi[index]);


        const li = document.createElement("li");
        const pre = document.createElement("pre");
        pre.textContent = ` Name :  ${name[index]}  Maths :  ${maths[index]}  English : ${english[index]}  Hindi : ${hindi[index]}  `;
        li.appendChild(pre);
        ol.appendChild(li);
    }
    document.body.appendChild(ol);

}
function sortByPercentage(params) {
    const percentage = new Array(name.length);
    for(let index = 0; index < name.length; index++) {
        const element = (maths[index] + english[index] + hindi[index]) / 3;
        // console.log("percentage is ",element.toFixed(2));
        percentage[index] = element.toFixed(2);
    }
    percentageArr = percentage;

    console.log("\n Before sorting with Percentage \n ");

    const before = document.createElement("h1");
    before.textContent = " Before sorting with Percentage ";
    document.body.appendChild(before);

    showDataWithPercentage();
    for(let i = 0; i < percentage.length - 1; i++) {
        for(let j = i + 1; j < percentage.length; j++) {
            if(percentage[i] < percentage[j]) {
                // console.log("value  " + percentage[i] + " is greater then " + percentage[j]);
                const temp = percentage[i];
                percentage[i] = percentage[j];
                percentage[j] = temp;
                const nameTemp = name[i];
                name[i] = name[j];
                name[j] = nameTemp;
                const mathTemp = maths[i];
                maths[i] = maths[j];
                maths[j] = mathTemp;
                const englishTemp = english[i];
                english[i] = english[j];
                english[j] = englishTemp;
                const hindiTemp = hindi[i];
                hindi[i] = hindi[j];
                hindi[j] = hindiTemp;
            }
        }
    }
    console.log("\n after sorting with Percentage \n ");

    const after = document.createElement("h1");
    after.textContent = " after sorting with Percentage ";
    document.body.appendChild(after);

    percentageArr = percentage;
    showDataWithPercentage();
}

function sortWithSubject(subjectName,arr) {
    console.log("\n sorting before ",subjectName," subject \n");
    const before = document.createElement("h1");
    before.textContent = `sorting before ${subjectName} subject `;
    document.body.appendChild(before);
    showData();
    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            if(arr[i] < arr[j]) {

                const nameTemp = name[i];
                name[i] = name[j];
                name[j] = nameTemp;
                const mathTemp = maths[i];
                maths[i] = maths[j];
                maths[j] = mathTemp;
                const englishTemp = english[i];
                english[i] = english[j];
                english[j] = englishTemp;
                const hindiTemp = hindi[i];
                hindi[i] = hindi[j];
                hindi[j] = hindiTemp;
            }
        }
    }
    console.log(arr)
    console.log("\n sorting after ",subjectName," subject \n");
    const after = document.createElement("h1");
    after.textContent = `sorting after ${subjectName} subject `;
    document.body.appendChild(after);
    showData();
}


function getStarted() {
    let promptValue = prompt(" Which option you want ",1);
    // alert(" selected option is ",promptValue);
    console.log(promptValue);
    if(promptValue) {
        switch(promptValue) {
            case '1':
                sortByPercentage();
                break;
            case '2':
                sortWithSubject("Maths",maths);
                break;
            case '3':
                sortWithSubject("English ",english);
                break;
            case '4':
                sortWithSubject("Hindi ",hindi);
                break;

            case '5':
                sortByPercentage();
                sortWithSubject("Maths",maths);

                sortWithSubject("English ",english);

                sortWithSubject("Hindi ",hindi);
                break;
            default:
                alert("Sorry wrong Input !");
                break;
        }

    } else {
        alert("you have not selected any value ");
    }
}