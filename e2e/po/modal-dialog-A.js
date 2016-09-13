/*global by element $*/

'use strict';
function CheckModal() {}

CheckModal.prototype.getFirstTitleField = function() {
    return element.all(by.binding('item.title')).first().getText();
};

CheckModal.prototype.getFirstAuthorField = function() {
    return element.all(by.binding('item.author')).first().getText();
};

CheckModal.prototype.getFirstGenreField = function() {
    return element.all(by.binding('item.genre')).first().getText();
};

CheckModal.prototype.getLastTitleField = function() {
    return element.all(by.binding('item.title')).last().getText();
};

CheckModal.prototype.getLastAuthorField = function() {
    return element.all(by.binding('item.author')).last().getText();
};

CheckModal.prototype.getLastGenreField = function() {
    return element.all(by.binding('item.genre')).last().getText();
};

CheckModal.prototype.getModalTitleField = function() {
    return $('input[name="title"]').evaluate('data.selectedBook.title');
};

CheckModal.prototype.getModalAuthorField = function() {
    return $('input[name="author"]').evaluate('data.selectedBook.author');
};

CheckModal.prototype.getModalGenreField = function() {
    return $('input[name="genre"]').evaluate('data.selectedBook.genre');
};

CheckModal.prototype.setModalAuthorField = function(newAuthor) {
    $('input[name="author"]').evaluate('data.selectedBook.author').clear().sendKeys(newAuthor);
};

CheckModal.prototype.setModalTitleField = function(newTitle) {
    $('input[name="title"]').evaluate('data.selectedBook.title').clear().sendKeys(newTitle);
};

CheckModal.prototype.setModalGenreField = function(newTitle) {
    $('input[name="genre"]').evaluate('data.selectedBook.genre').clear().sendKeys(newTitle);
};

CheckModal.prototype.clickModalButton = function(buttonName) {
    $(buttonName).click();
};

module.exports = CheckModal;
