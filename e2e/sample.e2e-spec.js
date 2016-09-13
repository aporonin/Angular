/*global browser by element */

'use strict';
var CheckDialogA = require('./po/dialog-A');
var CheckModal = require('./po/modal-dialog-A');

describe('sample e2e test suite', function() {


    var checkDialogA;
    var checkModal;

    beforeEach(function() {
        checkDialogA = new CheckDialogA();
        checkModal = new CheckModal();
    });

    it('should redirect to dialog a', function() {
            //given
            //when
            browser.get('/#/main/welcome/');
            browser.sleep(1000);
            element(by.cssContainingText('[href]', 'dialog A')).click();
            browser.sleep(1000);
            //then
            expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/#/component-1/dialog-a');
        }),

        it('should redirect to dialog b', function() {
            //given
            //when
            browser.get('/#/main/welcome/');
            browser.sleep(1000);
            element(by.cssContainingText('[href]', 'dialog B')).click();
            browser.sleep(1000);
            //then
            expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/#/component-2/dialog-b');
        }),

        it('should open modal to edit book by double click', function() {
            //given
            var modalEdit;
            //when
            checkDialogA.open('http://localhost:9000/#/component-1/dialog-a');
            checkDialogA.doubleClickFirstBook();
            browser.sleep(1000);
            modalEdit = checkDialogA.openModal('modal-edit');
            browser.waitForAngular();
            //then
            expect(modalEdit.isDisplayed()).toBeTruthy();
        }),

        it('should open modal to edit book by button', function() {
            //given
            var modalEdit;
            //when
            checkDialogA.open('http://localhost:9000/#/component-1/dialog-a');
            checkDialogA.clickFirstBook();
            browser.sleep(1000);
            checkDialogA.clickButton('Edit book');
            browser.sleep(1000);
            modalEdit = checkDialogA.openModal('modal-edit');
            browser.waitForAngular();
            //then
            expect(modalEdit.isDisplayed()).toBeTruthy();
        }),

        it('should open modal to add book by button', function() {
            //given
            var modalAdd;
            //when
            checkDialogA.open('http://localhost:9000/#/component-1/dialog-a');
            checkDialogA.clickButton('Add book');
            browser.sleep(1000);
            modalAdd = checkDialogA.openModal('modal-add');
            browser.waitForAngular();
            //then
            expect(modalAdd.isDisplayed()).toBeTruthy();
        }),

        it('should check that modal is filled during editing book ', function() {
            //given
            var modalEdit, expectedBookTitle, expectedBookAuthor, expectedBookGenre, modalBookAuthor, modalBookTitle, modalBookGenre;
            //when
            checkDialogA.open('http://localhost:9000/#/component-1/dialog-a');
            expectedBookAuthor = checkModal.getFirstAuthorField();
            expectedBookTitle = checkModal.getFirstTitleField();
            expectedBookGenre = checkModal.getFirstGenreField();
            checkDialogA.doubleClickFirstBook();
            modalEdit = checkDialogA.openModal('modal-edit');
            browser.waitForAngular();
            modalBookAuthor = checkModal.getModalAuthorField();
            modalBookTitle = checkModal.getModalTitleField();
            modalBookGenre = checkModal.getModalGenreField();
            //then
            expect(modalEdit.isDisplayed()).toBeTruthy();
            expect(modalBookAuthor).toEqual(expectedBookAuthor);
            expect(modalBookTitle).toEqual(expectedBookTitle);
            expect(modalBookGenre).toEqual(expectedBookGenre);
        }),

        it('should check that modal is empty during adding book ', function() {
            //given
            var modalEdit, expectedBookTitle, expectedBookAuthor, expectedBookGenre, modalBookAuthor, modalBookTitle, modalBookGenre;
            expectedBookAuthor = '';
            expectedBookTitle = '';
            expectedBookGenre = '';
            //when
            checkDialogA.open('http://localhost:9000/#/component-1/dialog-a');
            checkDialogA.clickButton('Add book');
            modalEdit = checkDialogA.openModal('modal-add');
            browser.waitForAngular();
            modalBookAuthor = checkModal.getModalAuthorField();
            modalBookTitle = checkModal.getModalTitleField();
            modalBookGenre = checkModal.getModalGenreField();
            //then
            expect(modalEdit.isDisplayed()).toBeTruthy();
            expect(modalBookAuthor).toEqual(expectedBookAuthor);
            expect(modalBookTitle).toEqual(expectedBookTitle);
            expect(modalBookGenre).toEqual(expectedBookGenre);
        }),

        it('should save book after click button submit in modal during editing book ', function() {
            //given
            var authorName, titleName, genreName;
            titleName = 'new title';
            authorName = 'new author';
            genreName = 'new genre';
            //when
            checkDialogA.open('http://localhost:9000/#/component-1/dialog-a');
            checkDialogA.doubleClickFirstBook();
            browser.waitForAngular();
            checkModal.setModalAuthorField(authorName);
            browser.sleep(1000);
            checkModal.setModalTitleField(titleName);
            browser.sleep(1000);
            checkModal.setModalGenreField(genreName);
            browser.sleep(1000);
            checkModal.clickModalButton('button[type="submit"]');
            //then
            expect(element.all(by.binding('item.author')).first().getText()).toEqual(authorName);
            expect(element.all(by.binding('item.title')).first().getText()).toEqual(titleName);
            expect(element.all(by.binding('item.genre')).first().getText()).toEqual(genreName);
        }),

        it('should not save book after click button close in modal during editing book ', function() {
            //given
            var expectedBookTitle, expectedBookAuthor, expectedBookGenre, authorName, titleName, genreName;
            titleName = 'new title';
            authorName = 'new author';
            genreName = 'new genre';
            //when
            checkDialogA.open('http://localhost:9000/#/component-1/dialog-a');
            expectedBookAuthor = checkModal.getFirstAuthorField();
            expectedBookTitle = checkModal.getFirstTitleField();
            expectedBookGenre = checkModal.getFirstGenreField();
            checkDialogA.doubleClickFirstBook();
            browser.waitForAngular();
            checkModal.setModalAuthorField(authorName);
            browser.sleep(1000);
            checkModal.setModalTitleField(titleName);
            browser.sleep(1000);
            checkModal.setModalGenreField(genreName);
            browser.sleep(1000);
            checkModal.clickModalButton('button[class="btn btn-danger"]');
            //then
            expect(element.all(by.binding('item.author')).first().getText()).toEqual(expectedBookAuthor);
            expect(element.all(by.binding('item.title')).first().getText()).toEqual(expectedBookTitle);
            expect(element.all(by.binding('item.genre')).first().getText()).toEqual(expectedBookGenre);
        }),

        it('should save book after click button submit in modal during adding book', function() {
            //given
            var authorName, titleName, genreName;
            titleName = 'new title';
            authorName = 'new author';
            genreName = 'new genre';
            //when
            checkDialogA.open('http://localhost:9000/#/component-1/dialog-a');
            checkDialogA.clickButton('Add book');
            browser.waitForAngular();
            checkModal.setModalAuthorField(authorName);
            browser.sleep(1000);
            checkModal.setModalTitleField(titleName);
            browser.sleep(1000);
            checkModal.setModalGenreField(genreName);
            browser.sleep(1000);
            checkModal.clickModalButton('button[type="submit"]');
            //then
            expect(element.all(by.binding('item.author')).last().getText()).toEqual(authorName);
            expect(element.all(by.binding('item.title')).last().getText()).toEqual(titleName);
            expect(element.all(by.binding('item.genre')).last().getText()).toEqual(genreName);
        }),

        it('should not save book after click button close in modal during adding book', function() {
            //given
            var lastBookTitle, lastBookAuthor, lastBookGenre, authorName, titleName, genreName;
            titleName = 'new title';
            authorName = 'new author';
            genreName = 'new genre';
            //when
            checkDialogA.open('http://localhost:9000/#/component-1/dialog-a');
            lastBookAuthor = checkModal.getLastAuthorField();
            lastBookTitle = checkModal.getLastTitleField();
            lastBookGenre = checkModal.getLastGenreField();
            checkDialogA.clickButton('Add book');
            browser.waitForAngular();
            checkModal.setModalAuthorField(authorName);
            browser.sleep(1000);
            checkModal.setModalTitleField(titleName);
            browser.sleep(1000);
            checkModal.setModalGenreField(genreName);
            browser.sleep(1000);
            checkModal.clickModalButton('button[class="btn btn-danger"]');
            //then
            expect(element.all(by.binding('item.author')).last().getText()).toEqual(lastBookAuthor);
            expect(element.all(by.binding('item.title')).last().getText()).toEqual(lastBookTitle);
            expect(element.all(by.binding('item.genre')).last().getText()).toEqual(lastBookGenre);
        }),

        it('should filter books in dialog b', function() {
            //given
            var countBooks = 5;
            //when
            browser.get('/#/component-2/dialog-b');
            browser.sleep(1000);
            element(by.cssContainingText('select', 'it')).click();
            browser.waitForAngular();
            //then
            expect(element.all(by.repeater('item in data.books')).count()).toEqual(countBooks);
        });
});
