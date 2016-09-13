angular.module('app.component1').service('bookService', function($http) {
    'use strict';

    var bookList = [];

    this.getBooksFromJson = function() {
        return $http.get('/component-1/books.json');
    };

    this.getRestBooks = function() {
        return bookList;
    };

    this.getGenres = function() {
        var result = ['it'];
        bookList.forEach(function(entry) {
            result.push(entry.genre);
        });
        result = result.filter(onlyUnique);
        return result;
    };

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    this.addBook = function(newBook) {
        bookList.push(newBook);
        $http.post('/addBook', newBook);
        return bookList;
    };

    this.updateBook = function(bookToEdit) {
        $http.put('/editBook', bookToEdit);
        return bookToEdit;
    };

    this.getEmptyBook = function() {
        var emptyBook = {
            id: '',
            version: '',
            genre: '',
            year: new Date().getFullYear(),
            title: '',
            author: ''
        };
        return emptyBook;
    };

});
