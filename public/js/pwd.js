class RandomNumbers {

    OddEven(i, minO, maxO, minE, maxE) {
        return i % 2 == 0 ?
            this.ToChar(minO, maxO) :
            this.ToChar(minE, maxE);

    }

    ToChar(min, max) {
        return String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    get(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class PwdGenerate {
    constructor(pwdLength = 8, upperCase = true, lowerCase = true, numbers = true, symbols = true, excludeDuplicates = true) {
        this._pwdLength = pwdLength;
        this._upperCase = upperCase;
        this._lowerCase = lowerCase;
        this._numbers = numbers;
        this._symbols = symbols;
        this._excludeDuplicates = excludeDuplicates;
    }

    set setPwdLength(value) {
        this._pwdLength = value;
    }
    set setUpperCase(value) {
        this._upperCase = value;
    }
    set setLowerCase(value) {
        this._lowerCase = value;
    }
    set setNumbers(value) {
        this._numbers = value;
    }
    set setSymbols(value) {
        this._symbols = value;
    }
    set setExcludeDuplicates(value) {
        this._excludeDuplicates = value;
    }

    get _randomNumbers() {
        return new RandomNumbers();
    }

    get() {

        numbersArray = this.random(48, 57);
        const upperArray = this.random(65, 90);
        const lowerArray = this.random(97, 122);
        const symbolsArray = 33 - 47 || 58 - 64 || 91 - 95 || 123 - 125;

        let pwd = "";
        if (this._upperCase && this._lowerCase && this._numbers && this._symbols) {
            if (this._excludeDuplicates) {
                pwd = this.pwdWithAllNoDuplicates(pwd);
            } else {
                pwd = this.pwdWithAll(pwd);
            }
        }

        if (this._upperCase && this._lowerCase && this._numbers) {
            if (this._excludeDuplicates) {
                pwd = this.pwdUpperLowerNumbersNoDuplicates(pwd);
            } else {
                pwd = this.pwdUpperLowerNumbers(pwd);
            }
        }

        if (this._upperCase && this._lowerCase && this._symbols) {
            if (this._excludeDuplicates) {
                pwd = this.pwdUpperLowerSymbolsNoDuplicates(pwd);
            } else {
                pwd = this.pwdUpperLowerSymbols(pwd);
            }
        }

        if (this._upperCase && this._lowerCase && this._numbers) {
            if (this._excludeDuplicates) {
                pwd = this.pwdUpperLowerNumbersNoDuplicates(pwd);
            } else {
                pwd = this.pwdUpperLowerNumbers(pwd);
            }
        }

        if (this._upperCase && this._lowerCase) {
            if (this._excludeDuplicates) {
                pwd = this.pwdUpperLowerNoDuplicates(pwd);
            } else {
                pwd = this.pwdUpperLower(pwd);
            }
        }

        if (this._upperCase) {
            if (this._excludeDuplicates) {
                pwd = this.pwdUpperNoDuplicates(pwd);
            } else {
                pwd = this.pwdUpper(pwd);
            }
        }
    }

    pwdUpperNoDuplicates(pwd) {
        return this.simplePwdNoDuplicatesToChar(65, 90, 25);;
    }

    pwdUpper(pwd) {
        return this.simplePwdToChar(65, 90);
    }

    pwdUpperLowerNoDuplicates(pwd) {
        return this.simplePwdNoDuplicatesOddEven(65, 90, 97, 122, 50);
    }

    pwdUpperLower(pwd) {
        return this.simplePwdOddEven(65, 90, 97, 122);
    }

    pwdUpperLowerSymbolsNoDuplicates(pwd) {
        return this.simplePwdNoDuplicatesOddEven(58, 95, 97, 125, 83);
    }

    pwdUpperLowerSymbols(pwd) {
        return this.simplePwdOddEven(58, 95, 97, 125);;
    }

    pwdUpperLowerNumbersNoDuplicates(pwd) {
        let i = 0;
        while (i < 60) {
            const rd = this._randomNumbers.get(1000, 100000000);
            let value = "";
            if (rd % 3 == 0) {
                value = this._randomNumbers.ToChar(65, 90); //  upper
                i++;
            } else if (rd % 7 == 0) {
                value = this._randomNumbers.ToChar(48, 57); //  numbers 
                i++;
            } else if (rd % 9 == 0) {
                value = this._randomNumbers.ToChar(97, 122); //  lower 
                i++;
            }
            ({ pwd, i } = this.contains(pwd, value, i));
        }
        return pwd;
    }

    pwdUpperLowerNumbers(pwd) {
        let i = 0;
        while (i < this._pwdLength) {
            const rd = this._randomNumbers.get(1000, 100000000);
            if (rd % 3 == 0) {
                pwd += this._randomNumbers.ToChar(65, 90); //  upper
                i++;
            } else if (rd % 7 == 0) {
                pwd += this._randomNumbers.ToChar(48, 57); //  numbers 
                i++;
            } else if (rd % 9 == 0) {
                pwd += this._randomNumbers.ToChar(97, 122); //  lower 
                i++;
            }
        }
        return pwd;
    }

    pwdWithAllNoDuplicates(pwd) {
        return this.simplePwdNoDuplicatesOddEven(33, 95, 97, 125, 93);
    }

    pwdWithAll(pwd) {
        return this.simplePwdOddEven(33, 95, 97, 125);
    }

    simplePwdNoDuplicatesOddEven(minO, maxO, minE, maxE, lenght) {
        let i = 0;
        while (i < lenght) {
            const rd = this._randomNumbers.get(1000, 100000000)
            const value = this._randomNumbers.OddEven(rd, minO, maxO, minE, maxE);
            ({ pwd, i } = this.contains(pwd, value, i));
        }
        return pwd;
    }

    simplePwdOddEven(minO, maxO, minE, maxE) {
        let i = 0;
        while (i < this._pwdLength) {
            const rd = this._randomNumbers.get(1000, 100000000);
            pwd += this._randomNumbers.OddEven(rd, minO, maxO, minE, maxE);
            i++;
        }
        return pwd;
    }

    simplePwdNoDuplicatesToChar(min, max, lenght) {
        let i = 0;
        while (i < lenght) {
            const rd = this._randomNumbers.get(1000, 100000000)
            const value = this._randomNumbers.ToChar(rd, min, max);
            ({ pwd, i } = this.contains(pwd, value, i));
        }
        return pwd;
    }

    simplePwdToChar(min, max) {
        let i = 0;
        while (i < this._pwdLength) {
            const rd = this._randomNumbers.get(1000, 100000000);
            pwd += this._randomNumbers.ToChar(rd, min, max);
            i++;
        }
        return pwd;
    }

    contains(pwd, value, i) {
        if (pwd.indexOf(value) == -1) {
            pwd += value;
            i++;
        }
        return { pwd, i };
    }
}

let pwdGenerate = new PwdGenerate();
const minimumAdvisable = pwdGenerate._pwdLength;

const pwdLength = document.getElementById("pwdLength");
const lblError = document.getElementById("lbl-error");
const valuePwd = document.getElementById("valuePwd");
const setPwd = document.getElementById("setPwd");
const copyPwd = document.getElementById("copyPwd");

pwdLength.value = minimumAdvisable;
let numberOfCheckBoxes = 4;

function setLblError(text) {
    lblError.innerHTML = text;
    const myTimeout = setTimeout(function() {
        lblError.innerHTML = "";
        clearTimeout(myTimeout);
    }, 5000);
}

pwdLength.addEventListener('change', function(e) {

    const value = parseInt(this.value);

    if (value < 8) {
        pwdLength.value = minimumAdvisable;
        setLblError("Minimum Advisable is 8.");
    } else if (value > 200) {
        pwdLength.value = 200;
        setLblError("Maximum value is 200.");
    } else {
        pwdGenerate.setPwdLength = value;
    };
});

document.body.addEventListener('change', function(e) {
    const target = e.target;
    switch (target.id) {
        case 'upperCase':
            setNumberOfCheckBoxes();
            pwdGenerate.setUpperCase = target.checked;
            break;
        case 'lowerCase':
            setNumberOfCheckBoxes();
            pwdGenerate.setLowerCase = target.checked;
            break;
        case 'numbers':
            setNumberOfCheckBoxes();
            pwdGenerate.setNumbers = target.checked;
            break;
        case 'symbols':
            setNumberOfCheckBoxes();
            pwdGenerate.setSymbols = target.checked;
            break;
        case 'excludeDuplicates':
            pwdGenerate.setExcludeDuplicates = target.checked;
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
        valuePwd.value = pwdGenerate.get();
        valuePwd.readOnly = true;
    } else {
        setLblError("One option must be checked.");
    }
})

copyPwd.addEventListener('click', function() {
    navigator.clipboard.writeText(copyText.value);
})