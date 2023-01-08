import constants from "./constants.js";

const validation = function() {
    let _required = function(value) {
        return value.length > 0;
    }
    let _email = function(value) {
        return constants.regExp.email.test(value);
    };
    let _userName = function(value) {
        return constants.regExp.userName.test(value);
    };
    let _isValid = function(value) {
        let isValid = false
        if (_required(value)) {
            if (_userName(value)) {
                isValid = true;
            };
        }
        return isValid;
    }
    let _setErrorMsg = function(target) {
        if (target.getAttribute("data-validation") === "invalid") {
            document.getElementById("error-" + target.id).classList.remove('hidden')
        } else {
            document.getElementById("error-" + target.id).classList.add('hidden')
        }
    }
    return {
        required: _required,
        email: _email,
        userName: _userName,
        isValid: _isValid,
        setErrorMsg: _setErrorMsg
    };
}

export default validation()