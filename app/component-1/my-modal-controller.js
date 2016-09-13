angular.module('app.component1').controller('MyModalController', function($scope, $modalInstance, selectedBook, bookList, bookService) {
    'use strict';

    $scope.selectedBook = selectedBook;
    $scope.bookList = bookList;

    $scope.data = {
        selectedBook: {
            id: selectedBook.id,
            title: selectedBook.title,
            author: selectedBook.author,
            genre: selectedBook.genre,
            version: selectedBook.version + 1,
            year: new Date(selectedBook.year + '')
        }
    };

    $scope.update = function() {
        $scope.data.selectedBook.year = $scope.data.selectedBook.year.getFullYear();
        bookService.updateBook($scope.data.selectedBook);
        angular.copy($scope.data.selectedBook, selectedBook);
        $modalInstance.dismiss();
    };

    $scope.close = function() {
        $modalInstance.dismiss();
    };

    $scope.addBook = function(title, author, genre, year) {
        var newBook = {
            id: bookList.length + 1,
            version: 0,
            genre: genre,
            year: year.getFullYear(),
            title: title,
            author: author
        };

        bookService.addBook(newBook);
        $modalInstance.dismiss();
        $scope.bookList.push(newBook);
    };

});
