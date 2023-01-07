import helper from "/global/helper.js";
import constants from "/global/constants.js";

class RandomNumbers {

    constructor() {}

    static get(min, max) {
        return helper.randomNumber(min, max); //Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static toChar(min, max) {
        return String.fromCharCode(this.get(min, max));
    }

    static oddEvenToChar(i, min, max, minA, maxA) {
        let char = undefined;
        if (arguments.length === 3) {
            char = this.toChar(min, max);

        } else if (arguments.length === 5) {
            char = i % 2 == 0 ? this.toChar(min, max) : this.toChar(minA, maxA);
        }
        return char;
    }

    static getUpperChar() {
        return this.toChar(65, 90);
    }

    static getNumberChar() {
        return this.toChar(48, 57);
    }

    static getLowerChar() {
        return this.toChar(97, 122);
    }

    static getSymbolChar() {
        return this.get(1000, 100000000) % 2 ? this.oddEvenToChar(this.get(1000, 100000000), 33, 47, 91, 95) : this.oddEvenToChar(this.get(1000, 100000000), 58, 65, 91, 95); // symbols
    }

    static finalLenght(pwdLength, lenght, excludeDuplicates) {
        return !excludeDuplicates ? pwdLength : pwdLength > lenght ? lenght : pwdLength;
    }

    static pwd(pwd, lenght, excludeDuplicates, min, max, minA, maxA, minE, maxE) {

        let i = pwd.length;

        if (arguments.length === 5) {
            while (i < lenght) {
                const rd = this.get(1000, 100000000)
                const value = this.oddEvenToChar(rd, min, max);
                isDuplicated(value);
            }
        } else if (arguments.length === 7) {
            while (i < lenght) {
                const rd = this.get(1000, 100000000)
                const value = this.oddEvenToChar(rd, min, max, minA, maxA);
                isDuplicated(value);
            }
        } else if (arguments.length === 9) {
            while (i < lenght) {
                const rd = RandomNumbers.get(1000, 100000000);
                let value = "";
                if (rd % 3 == 0) {
                    value = RandomNumbers.oddEvenToChar(rd, min, max);
                } else {
                    value = RandomNumbers.oddEvenToChar(rd, minA, maxA, minE, maxE);
                }
                isDuplicated(value);
            }
        }
        return pwd;

        function isDuplicated(value) {
            if (!excludeDuplicates) {
                pwd += value;
                i++;
            } else {
                if (value) {
                    if (pwd.indexOf(value) == -1) {
                        pwd += value;
                        i++;
                    }
                }
            }
        }
    }
}

class Generate {

    static Pwd = class {
        static get(pwdLength, excludeDuplicates) {
            let pwd = RandomNumbers.getUpperChar(); // upper
            pwd += RandomNumbers.getNumberChar(); // number
            pwd += RandomNumbers.getLowerChar(); // lower
            pwd += RandomNumbers.getSymbolChar(); // symbols

            const finalLength = RandomNumbers.finalLenght(pwdLength, constants.pwd.totalChars, excludeDuplicates);
            return finalLength === constants.pwd.totalChars ?
                RandomNumbers.pwd(pwd, finalLength, excludeDuplicates, 33, 95, 97, 126) :
                RandomNumbers.pwd(pwd, finalLength, excludeDuplicates, 33, 47, 58, 95, 97, 126);
        };
    }

    static PwdLetters = class {

        static upperLower(pwdLength, excludeDuplicates) {
            let pwd = RandomNumbers.getUpperChar(); // upper
            pwd += RandomNumbers.getLowerChar(); // lower
            return RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, (constants.pwd.nrOfLetters * 2), excludeDuplicates), excludeDuplicates, 65, 90, 97, 122);
        }

        static upper(pwdLength, excludeDuplicates) {
            let pwd = RandomNumbers.getUpperChar(); // upper
            return RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, constants.pwd.nrOfLetters, excludeDuplicates), excludeDuplicates, 65, 90);
        }

        static withSymbols(pwdLength, excludeDuplicates) {
            let pwd = RandomNumbers.getUpperChar(); // upper
            pwd += RandomNumbers.getSymbolChar(); // symbols
            return RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, (constants.pwd.nrOfLetters + constants.pwd.nrOfSymbols), excludeDuplicates), excludeDuplicates, 58, 95, 33, 47, 123, 126);
        }

        static withNumbers(pwdLength, excludeDuplicates) {
            let pwd = RandomNumbers.getUpperChar(); // upper
            pwd += RandomNumbers.getNumberChar(); // number
            return RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, (constants.pwd.nrOfLetters + constants.pwd.nrOfNumbers), excludeDuplicates), excludeDuplicates, 48, 57, 65, 90);
        }

        static withNumberSymbols(pwdLength, excludeDuplicates) {
            let pwd = RandomNumbers.getUpperChar(); // upper
            pwd += RandomNumbers.getNumberChar(); // number
            pwd += RandomNumbers.getSymbolChar(); // symbols
            return RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, (constants.pwd.nrOfLetters + constants.pwd.nrOfNumbers + constants.pwd.nrOfSymbols), excludeDuplicates), excludeDuplicates, 33, 63, 64, 95, 123, 126);
        }

        static upperLowerSymbols(pwdLength, excludeDuplicates) {
            let pwd = RandomNumbers.getUpperChar(); // upper
            pwd += RandomNumbers.getLowerChar(); // lower
            pwd += RandomNumbers.getSymbolChar(); // symbols
            return RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, (constants.pwd.nrOfLetters * 2 + constants.pwd.nrOfSymbols), excludeDuplicates), excludeDuplicates, 58, 95, 97, 126, 33, 47);
        }

        static upperLowerNumbers(pwdLength, excludeDuplicates) {
            let pwd = RandomNumbers.getUpperChar(); // upper
            pwd += RandomNumbers.getNumberChar(); // number
            pwd += RandomNumbers.getLowerChar(); // lower
            return RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, (constants.pwd.nrOfLetters * 2 + constants.pwd.nrOfNumbers), excludeDuplicates), excludeDuplicates, 65, 90, 48, 57, 97, 122);
        }
    };

    static PwdNumbersAndSymbols = class {

        static get(pwdLength, excludeDuplicates) {
            let pwd = RandomNumbers.getNumberChar(); // number
            pwd += RandomNumbers.getSymbolChar(); // symbols
            return RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, (constants.pwd.nrOfNumbers + constants.pwd.nrOfSymbols), excludeDuplicates), excludeDuplicates, 91, 95, 33, 64, 123, 126);
        }

        static getNumbers(pwdLength, excludeDuplicates) {
            let pwd = "";
            return RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, constants.pwd.nrOfNumbers, excludeDuplicates), excludeDuplicates, 48, 57);
        }

        static getSymbols(pwdLength, excludeDuplicates) {
            let pwd = "";
            pwd = RandomNumbers.pwd(pwd, RandomNumbers.finalLenght(pwdLength, constants.pwd.nrOfSymbols, excludeDuplicates), excludeDuplicates, 33, 63);
            pwd = pwd.replaceAll(0, String.fromCharCode(64));
            pwd = pwd.replaceAll(1, String.fromCharCode(91));
            pwd = pwd.replaceAll(2, String.fromCharCode(92));
            pwd = pwd.replaceAll(3, String.fromCharCode(93));
            pwd = pwd.replaceAll(4, String.fromCharCode(94));
            pwd = pwd.replaceAll(5, String.fromCharCode(95));
            pwd = pwd.replaceAll(6, String.fromCharCode(123));
            pwd = pwd.replaceAll(7, String.fromCharCode(124));
            pwd = pwd.replaceAll(8, String.fromCharCode(125));
            pwd = pwd.replaceAll(9, String.fromCharCode(126));
            return pwd;
        }
    }
}

export default class PwdGenerator {
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

    hasLetters() {
        let pwd = "";
        if (this._lowerCase && this._upperCase && this._numbers) {
            pwd = Generate.PwdLetters.upperLowerNumbers(this._pwdLength, this._excludeDuplicates);

        } else if (this._lowerCase && this._upperCase && this._symbols) {
            pwd = Generate.PwdLetters.upperLowerSymbols(this._pwdLength, this._excludeDuplicates);

        } else if ((this._lowerCase || this._upperCase) && this._numbers && this._symbols) {
            pwd = Generate.PwdLetters.withNumberSymbols(this._pwdLength, this._excludeDuplicates);

        } else if (this._lowerCase && this._upperCase) {
            pwd = Generate.PwdLetters.upperLower(this._pwdLength, this._excludeDuplicates);

        } else if ((this._lowerCase || this._upperCase) && this._numbers) {
            pwd = Generate.PwdLetters.withNumbers(this._pwdLength, this._excludeDuplicates);

        } else if ((this._lowerCase || this._upperCase) && this._symbols) {
            pwd = Generate.PwdLetters.withSymbols(this._pwdLength, this._excludeDuplicates);

        } else if (this._lowerCase || this._upperCase) {
            pwd = Generate.PwdLetters.upper(this._pwdLength, this._excludeDuplicates);
        }
        if (this._lowerCase && !this._upperCase) {
            pwd = pwd.toLowerCase();
        }
        return pwd;
    }

    hasNumberAndSymbols() {
        let pwd = "";
        if (this._symbols && this._numbers) {
            pwd = Generate.PwdNumbersAndSymbols.get(this._pwdLength, this._excludeDuplicates);

        } else if (this._symbols) {
            pwd = Generate.PwdNumbersAndSymbols.getSymbols(this._pwdLength, this._excludeDuplicates);

        } else if (this._numbers) {
            pwd = Generate.PwdNumbersAndSymbols.getNumbers(this._pwdLength, this._excludeDuplicates);

        }
        return pwd;
    }

    get() {
        let pwd = "";
        if (this._upperCase && this._lowerCase && this._numbers && this._symbols) {
            pwd = Generate.Pwd.get(this._pwdLength, this._excludeDuplicates);
        }
        if (pwd === "") {
            pwd = this.hasLetters();
            if (pwd === "") {
                pwd = this.hasNumberAndSymbols();
            }
        }
        return pwd;
    }
}