/**
 * Numeral systems that are allowed: dec, hex and bin.
 * @param {string} from Numeral system of the given number
 * @param {number | string} num The number to convert
 * @param {string} to Expected numeral system
 * @returns {string | null} A string representing a number in the given numeral system or null if any argument is invalid.
 */
const convert = (from, num, to) => {
    const fromNumSystem = getNumSystem(from);
    const toNumSystem = getNumSystem(to);
    let convertedNum = 0;

    if (num == null || fromNumSystem < 0 || toNumSystem < 0) return null;
    
    const numValidator = getNumSystemValidator(from);
    num = num.toString();

    if (num.match(numValidator).length != num.length) return null;
    if (fromNumSystem !== 10) {
        convertedNum = toDecimal(num, from);
    }

    return decimalTo(convertedNum || num, to);
}

const decimalTo = (num, systemName) => {
    const numSystem = getNumSystem(systemName);
    let numStr = '';
    
    if (numSystem > 10) {
        do {
            const digit = num % numSystem;
            num = Math.floor(num / numSystem);
            numStr = getCharValueFromNum(digit) + numStr;
        } while(num > 0);
    } else if (numSystem < 10) {
        do {
            const digit = num % numSystem;
            num = Math.floor(num / numSystem);
            numStr = digit + numStr;
        } while (num > 0);
    }
    
    return numStr !== '' ? numStr : num;
}

const toDecimal = (num, systemName) => {
    const numStr = num.toString();
    const numSystem = getNumSystem(systemName);
    let decimalNum = 0;
    let digitValue = 1;
    
    if (numSystem === -1) return null;
    else if (numSystem > 10) {
        for (let i = numStr.length - 1; i > -1; i--) {
            decimalNum += getNumValueFromChar(numStr[i].toUpperCase()) * digitValue;
            digitValue *= numSystem;
        }
    } else {
        for (let i = numStr.length - 1; i > -1; i--) {
            decimalNum += parseInt(numStr[i]) * digitValue;
            digitValue *= numSystem;
        }
    }
    
    return decimalNum;
}

const getNumSystemValidator = (systemName) => {
    switch (systemName) {
        case 'bin': return new RegExp('[0-1]', 'g');
        case 'dec': return new RegExp('[0-9]', 'g');
        case 'hex': return new RegExp('[0-9a-f]', 'gi');
        default: return -1;
    }
}

const getNumSystem = (systemName) => {
    switch (systemName) {
        case 'bin': return 2;
        case 'dec': return 10;
        case 'hex': return 16;
        default: return -1;
    }
}

const getNumValueFromChar = (char) => {
    switch (char) {
        case 'A': return 10;
        case 'B': return 11;
        case 'C': return 12;
        case 'D': return 13;
        case 'E': return 14;
        case 'F': return 15;
        default: return parseInt(char);
    }
}

const getCharValueFromNum = (num) => {
    switch(num) {
        case 10: return 'A';
        case 11: return 'B';
        case 12: return 'C';
        case 13: return 'D';
        case 14: return 'E';
        case 15: return 'F';
        default: return num;
    }
}

module.exports = convert;