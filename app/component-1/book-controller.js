angular.module('app.component1').controller('BookController', function($scope, $http, $modal, bookService) {
    'use strict';

    $scope.data = {
        books: []
    };

    bookService.getBooksFromJson().then(function(result) {
        $scope.data.books = result.data.concat(bookService.getRestBooks());
    });

    $scope.edit = function() {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-dialog-update.tpl.html',
            controller: 'MyModalController',
            size: 'lg',
            resolve: {
                selectedBook: function() {
                    return $scope.data.books[$scope.selectedRowIndex];
                },
                bookList: function() {
                    return $scope.data.books;
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
                    return bookService.getEmptyBook();
                },
                bookList: function() {
                    return $scope.data.books;
                }
            }
        });
    };

    $scope.selectRow = function(index) {
        $scope.selectedRowIndex = index;
    };
});
