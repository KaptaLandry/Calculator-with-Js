class Calculator {
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

clear(){
    this.currentOperand =''
    this.previousOperand = ''
    this.operation = undefined
}

delete(){
    this.currentOperand =this.currentOperand.toString().slice(0, -1)
}

appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.')) retrun
     this.currentOperand = this.currentOperand.toString() + number.toString()
}

symbol(){

}

chooseOperation(operation){
 if (this.currentOperand === '') return   
 if (this.previousOperand !== ''){
     this.compute()
 }
 this.operation = operation
 this.previousOperand = this.currentOperand
 this.currentOperand = ''
}

compute(){
   let computation 
   const prev = parseFloat(this.previousOperand)
   const current= parseFloat(this.currentOperand)
   if (isNaN(prev) || isNaN(current)) return
   switch (this.operation){
       case '+' :
           computation = prev + current
           break
        case '-' :
            computation = prev - current
            break
        case '×' :
                computation = prev * current
                break
        case '÷' :
                    computation = prev / current
                    break
        case '%' :
                    computation = prev % current
                    break
            default:
                return        
   }
     this.currentOperand =computation
     this.operation = undefined
     this.previousOperand = ''
}

getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDiplay
    if (isNaN(integerDigits)){
        integerDiplay = ''
    } else{
          integerDiplay = integerDigits.toLocaleString('en', {
              maximumFractionDigits: 0
          })
    }
   if (decimalDigits != null){
       return `${integerDiplay}.${decimalDigits}`
   }else {
       return integerDiplay
   }
}

 updateDisplay(){
    this.currentOperandText.innerText = 
       this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandText.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
  }   else {
      this.previousOperandText.innerText = ''
  }
 }   
}


const numberButtons = document.querySelectorAll(' [data-number]')
const operationButtons = document.querySelectorAll(' [data-operation]')
const eqaulsButton = document.querySelector(' [data-equals]')
const deleteButton = document.querySelector(' [data-delete]')
const allClearButton = document.querySelector(' [data-clear-all]')
const previousOperandText = document.querySelector(' [data-previous]')
const currentOperandText = document.querySelector(' [data-current]')


const calculator = new Calculator(previousOperandText,
    currentOperandText)

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })
    })

    
       operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOperation(button.innerText)
                calculator.updateDisplay()
            })
        })

    eqaulsButton.addEventListener('click', button => {
           calculator.compute()
           calculator.updateDisplay()
    })   

    allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
 })   

    deleteButton.addEventListener('click', button => {
        calculator.delete()
        calculator.updateDisplay()
 })   
