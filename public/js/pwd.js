import PwdGenerator from "../models/pwd-model.js";

let pwdGenerator = new PwdGenerator();
const minimumAdvisable = pwdGenerator._pwdLength;

const pwdLength = document.getElementById("pwdLength");
const lblError = document.getElementById("lbl-error");
const valuePwd = document.getElementById("valuePwd");
const setPwd = document.getElementById("setPwd");
const copyPwd = document.getElementById("copyPwd");

pwdLength.value = minimumAdvisable;
let numberOfCheckBoxes = 4;

function setLblError(text, classOpt) {
    if (classOpt === "danger") {
        setClass("text-danger", "text-warning");
    }
    if (classOpt === "warning") {
        setClass("text-warning", "text-danger");
    }

    lblError.innerHTML = text;
    const myTimeout = setTimeout(function() {
        lblError.innerHTML = "";
        clearTimeout(myTimeout);
    }, 5000);

    function setClass(newClass, oldClass) {
        if (!lblError.classList.contains(newClass)) {
            lblError.classList.add(newClass);
        }
        if (lblError.classList.contains(oldClass)) {
            lblError.classList.remove(oldClass);
        }
    }
}

pwdLength.addEventListener('change', function(e) {

    const value = parseInt(this.value);

    if (value < 8) {
        pwdLength.value = minimumAdvisable;
        setLblError("Minimum Advisable is 8.", "danger");
    } else if (value > 200) {
        pwdLength.value = 200;
        setLblError("Maximum value is 200.", "danger");
    } else {
        pwdGenerator.setPwdLength = value;
    };
});

document.body.addEventListener('change', function(e) {
    const target = e.target;
    switch (target.id) {
        case 'upperCase':
            setNumberOfCheckBoxes();
            pwdGenerator.setUpperCase = target.checked;
            break;
        case 'lowerCase':
            setNumberOfCheckBoxes();
            pwdGenerator.setLowerCase = target.checked;
            break;
        case 'numbers':
            setNumberOfCheckBoxes();
            pwdGenerator.setNumbers = target.checked;
            break;
        case 'symbols':
            setNumberOfCheckBoxes();
            pwdGenerator.setSymbols = target.checked;
            break;
        case 'excludeDuplicates':
            pwdGenerator.setExcludeDuplicates = target.checked;
            break;
    }

    function setNumberOfCheckBoxes() {
        if (target.checked) {
            numberOfCheckBoxes += 1;
        } else {
            numberOfCheckBoxes -= 1;
        }
    }
});

setPwd.addEventListener('click', function() {
    if (numberOfCheckBoxes > 0) {
        valuePwd.readOnly = false;
        valuePwd.value = pwdGenerator.get();
        valuePwd.readOnly = true;

        if (valuePwd.value.length < pwdGenerator._pwdLength) {
            setLblError("With these options you can only do with the size of " + valuePwd.value.length, "warning");
        }
    } else {
        setLblError("One option must be checked.", "warning");
    }
})

copyPwd.addEventListener('click', function() {
    navigator.clipboard.writeText(valuePwd.value);
})