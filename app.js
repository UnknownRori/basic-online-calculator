class Calculator
{
    constructor (CurrentElem, PerviousElem) {
        this.CurrentElem = CurrentElem;
        this.PerviousElem = PerviousElem;
        this.clear();
    }

    clear () {
        this.CurrentOperand = '';
        this.PreviousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    clearCurrent () {
        this.CurrentOperand = '';
        this.updateDisplay();
    }

    delete () {
        this.CurrentOperand = this.CurrentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber (number) {
        if (number === '.' && this.CurrentOperand.includes('.')) return;
        this.CurrentOperand = this.CurrentOperand.toString() + number.toString();
        app.updateDisplay();
    }

    convert () {
        this.CurrentOperand = -1 * parseFloat(this.CurrentOperand).toString();
        this.updateDisplay();
    }

    setOperation (operation) {
        if (this.CurrentOperand === '') return;

        if (this.PreviousOperand !== '') {
            this.calculate();
        }

        this.operation = operation;
        this.PreviousOperand = this.CurrentOperand;
        this.CurrentOperand = '';
        this.updateDisplay();
    }

    calculate () {
        const prev = parseFloat(this.PreviousOperand);
        const curr = parseFloat(this.CurrentOperand);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+':
                this.CurrentOperand = prev + curr;
                break;
            case '-':
                this.CurrentOperand = prev - curr;
                break;
            case '÷':
                this.CurrentOperand = prev / curr;
                break;
            case 'X':
                this.CurrentOperand = prev * curr;
                break;
            case '%':
                this.CurrentOperand = prev % curr;
                break;
            default:
                return
        }
        this.operation = undefined;
        this.PreviousOperand = '';
        this.updateDisplay();
    }

    getDisplayNumber (number) {
        const string = number.toString();
        const integer = parseFloat(string.split('.')[0]);
        const decimal = string.split('.')[1];
        let display;

        if (isNaN(integer)) {
            display = '';
        } else {
            display = integer.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimal != null) {
            return `${display} . ${decimal}`;
        } else {
            return display;
        }
    }

    updateDisplay () {
        this.CurrentElem.innerText = this.getDisplayNumber(this.CurrentOperand);
        if (this.operation != null) {
            this.PerviousElem.innerText = `${this.getDisplayNumber(this.PreviousOperand) + ' ' + this.operation}`;
        } else {
            this.PerviousElem.innerText = '';
        }
    }
}

const PerviousElem = document.querySelector('[data-previous]');
const CurrentElem = document.querySelector('[data-current]');
const EqualButton = document.querySelector('[data-equal]');
const ConvertButton = document.querySelector('[data-convert]');
const DeleteButton = document.querySelector('[data-delete]');
const ClearButton = document.querySelector('[data-clear]');
const ClearCurrentButton = document.querySelector('[data-clearCurrent]');

const NumberButton = document.querySelectorAll('[data-number]');
const OperationButton = document.querySelectorAll('[data-operation]');

const app = new Calculator(CurrentElem, PerviousElem);

NumberButton.forEach((button) => {
    button.addEventListener('click', () => {
        app.appendNumber(button.innerText);
    })
})

EqualButton.addEventListener('click', () => {
    app.calculate();
})

OperationButton.forEach((button) => {
    button.addEventListener('click', () => {
        app.setOperation(button.innerText);
    })
})

ConvertButton.addEventListener('click', () => {
    app.convert();
})

DeleteButton.addEventListener('click', () => {
    app.delete();
})

ClearButton.addEventListener('click', () => {
    app.clear();
})

ClearCurrentButton.addEventListener('click', () => {
    app.clearCurrent();
})