/*
 * This file is the plain js (jquery and prototypes) version of the interview programming exercises.
 * 
 * As the candidate, your tasks are
 *    1. load the html page into a browser and test its functionality
 *    2. note the bugs and fix them. Be prepared to explain your work. (use window.alert or a new span to put out error messages)
 *       - if you get stuck and can't make any progress, ask for help because getting some help and making progress is better
 *         than not getting anything done.
 *    3. extra credit: change the equation entry to free form text entry
 *       3.1 first, make it functionally equivalent to the existing entry
 *       3.2 second, allow any well formed equation using the given operators with the addition of parentheses
 *       
 */
var Equation=function() {
    this.operand1 = null;
    this.operand2 = null;
    this.operator = null;
    this.answer = null;
};

Equation.prototype.compute = function() {
    if (isFinite(this.operand1) && isFinite(this.operand2) && this.operator) {

        switch (this.operator) {
        case '+':
            this.answer = this.operand1 + this.operand2;
            break;
        case '-':
            this.answer = this.operand1 - this.operand2;
            break;
        case '/':
            if (this.operand2 !== 0)
                this.answer = this.operand1 / this.operand2;
            else window.alert('cannot divide by zero');
            break;
        case '*':
            this.answer = this.operand1 * this.operand2;
            break;

        default:
            break;
        } 
        $('#answer').text(this.answer);
    }
};

Equation.prototype.updateOperand = function(event, self) {
    // a really thorough person would check for non numeric, non whitespace, non decimal point chars
    // #operand1 is a jquery selector not a js one; so, either the below or $('event.currentTarget').id() === '#operand1'
    if (event.currentTarget.id === 'operand1')
        self.operand1 = parseFloat($(event.currentTarget).val());
    else self.operand2 = parseFloat($(event.currentTarget).val());
    self.compute();
};

Equation.prototype.updateOperator = function(event, self) {
    self.operator = $(event.currentTarget).val();
    self.compute();
};

$(document).ready(function() {
    // ready is needed because the dom elements are not necessarily in the dom when the selectors run otherwise
    var equation = new Equation();
    // the closure is needed to get access to the equation object (or weaker, the fns could directly use equation, but
    // then ask what if there were more than one equation on the screen)
    // a better way to do these would be in the Equation constructor
    $('#operator').change(function (event) { equation.updateOperator(event, equation); });
    
    $('.operand').change(function (event) { equation.updateOperand( event, equation ); });
});