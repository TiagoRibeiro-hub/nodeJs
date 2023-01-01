class RandomNumbers {

    constructor() {}

    static get(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static ToChar(min, max) {
        return String.fromCharCode(this.get(min, max));
    }

    static OddEvenToChar(i, min, max, minE, maxE) {
        let char = undefined;
        if (arguments.length === 3) {
            char = this.ToChar(min, max);

        } else if (arguments.length === 5) {
            char = i % 2 == 0 ? this.ToChar(min, max) : this.ToChar(minE, maxE);
        }
        return char;
    }

    static insertNumberChar(pwd) {
        this.ToChar(48, 57)
    }

    static pwdNoDuplicates(pwdLength, lenght, min, max, minE, maxE, minQ, maxQ) {
        let pwd = "";
        const finalLenght = pwdLength > lenght ? lenght : pwdLength;
        let i = 0;

        if (arguments.length === 4) {
            while (i < finalLenght) {
                const rd = this.get(1000, 100000000)
                const value = this.OddEvenToChar(rd, min, max);
                ({ pwd, i } = this.contains(pwd, value, i));
            }
        } else if (arguments.length === 6) {
            while (i < finalLenght) {
                const rd = this.get(1000, 100000000)
                const value = this.OddEvenToChar(rd, min, min, minE, maxE);
                ({ pwd, i } = this.contains(pwd, value, i));
            }
        } else if (arguments.length === 8) {
            const nr1 = this.get(1, 10);
            let nr2 = undefined;
            while (true) {
                nr2 = this.get(1, 10);
                if (nr2 != nr1) {
                    break;
                }
            }
            while (i < finalLenght) {
                const rd = RandomNumbers.get(1000, 100000000);
                let value = "";
                if (rd % nr1 == 0) {
                    value = RandomNumbers.OddEvenToChar(rd, min, max);
                } else if (rd % nr2 == 0) {
                    value = RandomNumbers.OddEvenToChar(rd, minE, maxE);
                } else {
                    value = RandomNumbers.OddEvenToChar(rd, minO, maxO);
                }
                ({ pwd, i } = RandomNumbers.OddEvenToChar(pwd, value, i));
            }
        }
        return pwd;
    }

    static pwd(pwdLength, min, max, minE, maxE, minQ, maxQ) {
        let pwd = "";
        let i = 0;

        if (arguments.length === 3) {
            while (i < pwdLength) {
                const rd = this.get(1000, 100000000);
                pwd += this.OddEvenToChar(rd, min, max);
                i++;
            }
        } else if (arguments.length === 5) {
            while (i < pwdLength) {
                const rd = this.get(1000, 100000000);
                pwd += this.OddEvenToChar(rd, min, max, minE, maxE);
                i++;
            }
        } else if (arguments.length === 7) {
            const nr1 = this.get(1, 10);
            let nr2 = undefined;
            while (true) {
                nr2 = this.get(1, 10);
                if (nr2 != nr1) {
                    break;
                }
            }
            while (i < pwdLength) {
                const rd = this.get(1000, 100000000);
                if (rd % nr1 == 0) {
                    pwd += this.OddEvenToChar(rd, min, max);
                } else if (rd % nr2 == 0) {
                    pwd += this.OddEvenToChar(rd, minE, maxE);
                } else {
                    pwd += this.OddEvenToChar(rd, minQ, maxQ);
                }
                i++;
            }
        }
        return pwd;
    }

    static contains(pwd, value, i) {
        if (value) {
            if (pwd.indexOf(value) == -1) {
                pwd += value;
                i++;
            }
        }
        return { pwd, i };
    }
}

class Constants {
    static nrOfLetters = 26;
    static nrOfNumbers = 10;
    static nrOfSymbols = 31;
    static totalChars = this.nrOfLetters * 2 + this.nrOfNumbers + this.nrOfSymbols;

}
Object.freeze(Constants);

class Generate {

    static pwdUpperSymbolsNoDuplicates(pwdLength) {
        let pwd = RandomNumbers.pwdNoDuplicates(pwdLength, (Constants.nrOfLetters + Constants.nrOfSymbols), 33, 47, 123, 126, 58, 95);
        if (!isNaN(pwd)) {
            pwd = RandomNumbers.insertNumberChar(pwd);
        };
        return pwd;
    }

    static pwdUpperSymbols(pwdLength) {
        let pwd = RandomNumbers.pwd(pwdLength, 33, 47, 123, 126, 58, 95);
        if (!isNaN(pwd)) {
            pwd = RandomNumbers.insertNumberChar(pwd);
        };
        return pwd;
    }

    static pwdUpperNumbersNoDuplicates(pwdLength) {
        return RandomNumbers.pwdNoDuplicates(pwdLength, (Constants.nrOfLetters + Constants.nrOfNumbers), 48, 57, 65, 90);
    }

    static pwdUpperNumbers(pwdLength) {
        return RandomNumbers.pwd(pwdLength, 48, 57, 65, 90);
    }

    static pwdUpperNoDuplicates(pwdLength) {
        return RandomNumbers.pwdNoDuplicates(pwdLength, Constants.nrOfLetters, 65, 90);
    }

    static pwdUpper(pwdLength) {
        return RandomNumbers.pwd(pwdLength, 65, 90);
    }

    static pwdUpperLowerNoDuplicates(pwdLength) {
        return RandomNumbers.pwdNoDuplicates(pwdLength, (Constants.nrOfLetters * 2), 65, 90, 97, 122);
    }

    static pwdUpperLower(pwdLength) {
        return RandomNumbers.pwd(65, 90, 97, 122, pwdLength);
    }

    static pwdUpperLowerSymbolsNoDuplicates(pwdLength) {
        return RandomNumbers.pwdNoDuplicates(pwdLength, (Constants.nrOfLetters * 2 + Constants.nrOfSymbols), 58, 95, 97, 126);
    }

    static pwdUpperLowerSymbols(pwdLength) {
        return RandomNumbers.pwd(pwdLength, 58, 95, 97, 126);
    }

    static pwdUpperLowerNumbersNoDuplicates(pwdLength) {
        let pwd = "";
        let i = 0;
        const length = (Constants.nrOfLetters * 2 + Constants.nrOfNumbers);
        const finalLenght = pwdLength > length ? length : pwdLength;
        while (i < finalLenght) {
            const rd = RandomNumbers.get(1000, 100000000);
            let value = "";
            if (rd % 3 == 0) {
                value = RandomNumbers.ToChar(65, 90); //  upper
            } else if (rd % 7 == 0) {
                value = RandomNumbers.ToChar(48, 57); //  numbers 
            } else if (rd % 9 == 0) {
                value = RandomNumbers.ToChar(97, 122); //  lower 
            }
            ({ pwd, i } = RandomNumbers.contains(pwd, value, i));
        }
        return pwd;
    }

    static pwdUpperLowerNumbers(pwdLength) {
        let pwd = "";
        let i = 0;
        while (i < pwdLength) {
            const rd = RandomNumbers.get(1000, 100000000);
            if (rd % 3 == 0) {
                pwd += RandomNumbers.ToChar(65, 90); //  upper
                i++;
            } else if (rd % 7 == 0) {
                pwd += RandomNumbers.ToChar(48, 57); //  numbers 
                i++;
            } else if (rd % 9 == 0) {
                pwd += RandomNumbers.ToChar(97, 122); //  lower 
                i++;
            }
        }
        return pwd;
    }

    static pwdWithAllNoDuplicates(pwdLength) {
        let pwd = RandomNumbers.pwdNoDuplicates(pwdLength, Constants.totalChars, 33, 63, 64, 95, 97, 126);
        if (!isNaN(pwd)) {
            pwd = RandomNumbers.insertNumberChar(pwd);
        }
        return pwd;
    }

    static pwdWithAll(pwdLength) {
        let pwd = RandomNumbers.pwd(pwdLength, 33, 63, 64, 95, 97, 126);
        if (!isNaN(pwd)) {
            pwd = RandomNumbers.insertNumberChar(pwd);
        }
        return pwd;
    }
}

class PwdGenerator {
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

    isUpperCase() {
        let pwd = "";
        if (this._upperCase) {

            if (this._upperCase && this._lowerCase && this._numbers) {
                if (this._excludeDuplicates) {
                    pwd = Generate.pwdUpperLowerNumbersNoDuplicates(this._pwdLength);
                } else {
                    pwd = Generate.pwdUpperLowerNumbers(this._pwdLength);
                }

            } else if (this._upperCase && this._lowerCase && this._symbols) {
                if (this._excludeDuplicates) {
                    pwd = Generate.pwdUpperLowerSymbolsNoDuplicates(this._pwdLength);
                } else {
                    pwd = Generate.pwdUpperLowerSymbols(this._pwdLength);
                }

            } else if (this._upperCase && this._lowerCase && this._numbers) {
                if (this._excludeDuplicates) {
                    pwd = Generate.pwdUpperLowerNumbersNoDuplicates(this._pwdLength);
                } else {
                    pwd = Generate.pwdUpperLowerNumbers(this._pwdLength);
                }

            } else if (this._upperCase && this._lowerCase) {
                if (this._excludeDuplicates) {
                    pwd = Generate.pwdUpperLowerNoDuplicates(this._pwdLength);
                } else {
                    pwd = Generate.pwdUpperLower(this._pwdLength);
                }

            } else if (this._upperCase && this._numbers) {
                if (this._excludeDuplicates) {
                    pwd = Generate.pwdUpperNumbersNoDuplicates(this._pwdLength);
                } else {
                    pwd = Generate.pwdUpperNumbers(this._pwdLength);
                }

            } else if (this._upperCase && this._symbols) {
                if (this._excludeDuplicates) {
                    pwd = Generate.pwdUpperSymbolsNoDuplicates(this._pwdLength);
                } else {
                    pwd = Generate.pwdUpperSymbols(this._pwdLength);
                }

            } else {
                if (this._excludeDuplicates) {
                    pwd = Generate.pwdUpperNoDuplicates(this._pwdLength);
                } else {
                    pwd = Generate.pwdUpper(this._pwdLength);
                }
            }
        }
        return pwd;
    }

    isLowerCase() {
        let pwd = "";
        if (this._lowerCase) {

        }
        return pwd;
    }

    get() {
        let pwd = "";
        if (this._upperCase && this._lowerCase && this._numbers && this._symbols) {
            if (this._excludeDuplicates) {
                pwd = Generate.pwdWithAllNoDuplicates(this._pwdLength);
            } else {
                pwd = Generate.pwdWithAll(this._pwdLength);
            }
        }
        if (pwd === "") {
            pwd = this.isUpperCase();
            if (pwd === "") {
                pwd = this.isLowerCase();
            }
        }
        return pwd;
    }










}

let pwdGenerator = new PwdGenerator();
const minimumAdvisable = pwdGenerator._pwdLength;

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
    } else {
        setLblError("One option must be checked.");
    }
})

copyPwd.addEventListener('click', function() {
    navigator.clipboard.writeText(copyText.value);
})