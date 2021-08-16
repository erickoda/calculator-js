class Calculator{
    constructor(previousScreenTextElement, resultScreenTextElement){
        this.previousScreenTextElement = previousScreenTextElement;
        this.resultScreenTextElement = resultScreenTextElement;
        this.clear();
    }

    clear(){
        this.resultScreen = '';
        this.previousScreen = '';
        this.operation = undefined;
    }

    delete(){
        this.resultScreen = this.resultScreen.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.resultScreen.includes('.')) return;
        this.resultScreen = this.resultScreen.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.resultScreen === '') return;

        if(this.previousScreen !== ''){
            this.compute
        }
        this.operation = operation;
        this.previousScreen = this.resultScreen;
        this.resultScreen = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousScreen);
        const result = parseFloat(this.resultScreen);
        if (isNaN(prev) || isNaN(result)) return;
        switch (this.operation){
            case '÷': 
                computation = prev / result;
                break;

            case '×':
                computation = prev * result;
                break;
            
            case '+':
                computation = prev + result;
                break;

            case '-':
                computation = prev - result;
                break;

            default:
                result;
        }

        this.resultScreen = computation;
        this.operation = undefined;
        this.previousScreen = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.resultScreenTextElement.innerText = this.getDisplayNumber(this.resultScreen);
        if(this.operation != null){
            this.previousScreenTextElement.innerText = `${this.getDisplayNumber(this.previousScreen)} ${this.operation}`;
        } else {
            this.previousScreenTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const dataAC = document.querySelector('[data-AC]');
const previousScreenTextElement = document.querySelector('[data-previous]');
const resultScreenTextElement = document.querySelector('[data-result]');

const calculator = new Calculator(previousScreenTextElement, resultScreenTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

dataAC.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();   
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

console.log("hello")