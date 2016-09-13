angular.module('app.component1').controller('FilterController', function($scope, $http, bookService) {
    'use strict';

    $scope.data = {
        books: []
    };

    bookService.getBooksFromJson().then(function(result) {
        $scope.data.books = result.data.concat(bookService.getRestBooks());
    });

    $scope.genres = bookService.getGenres();
    $scope.selectedComboOption = bookService.getGenres()[0];

});
