/*global browser by element */

'use strict';
function CheckDialogA (){
}

CheckDialogA.prototype.open = function(url){
    browser.get(url);
};


CheckDialogA.prototype.clickButton = function(buttonName){
    element(by.buttonText(buttonName)).click();
};


CheckDialogA.prototype.openModal = function(modalName){
  return element(by.name(modalName));
};

CheckDialogA.prototype.clickFirstBook = function(){
  browser.actions().click(element.all(by.repeater('item in data.books')).first()).perform();
};

CheckDialogA.prototype.doubleClickFirstBook = function(){
  browser.actions().doubleClick(element.all(by.repeater('item in data.books')).first()).perform();
};

module.exports = CheckDialogA;
