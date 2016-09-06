angular.module('app.component1').controller('MyFirstController', function($scope, $http, $modal, books) {
    'use strict';

    $scope.data = {
        helloWorld: 'hello world',
        form: {},
        books: []
    };

    $scope.edit = function() {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-dialog.tpl.html',
            controller: 'MyModalController',
            size: 'lg',
            resolve: {
                selectedBook: function() {

                    return $scope.data.books[$scope.selectedRowIndex];
                }
            }
        });

    };

    $scope.add = function() {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-dialog-add.tpl.html',
            controller: 'MyModalController',
            size: 'lg',
            resolve: {
                selectedBook: function() {

                    return $scope.data.books[$scope.selectedRowIndex];
                }
            }
        });

    };

    angular.copy(books.data, $scope.data.books);


    $scope.selectRow = function(index) {
        $scope.selectedRowIndex = index;

    };

}).controller('MyModalController', function($scope, $modalInstance, selectedBook) {
    'use strict';

    $scope.selectedBook = selectedBook;

    $scope.data = {
        selectedBook: {
            title: selectedBook.title,
            author: selectedBook.author,
            genre: selectedBook.genre,
            year: selectedBook.year
        }
    };

    $scope.update = function() {
        angular.copy($scope.data.selectedBook, selectedBook);
    };

    $scope.close = function() {
        $modalInstance.dismiss();
    };

    $scope.addBook = function(title, author, genre, year) {
        $scope.data.books.push({
            title: title,
            author: author,
            genre: genre,
            year: year
        });
    };

});
