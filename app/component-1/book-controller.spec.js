describe('BookController tests', function() {
    'use strict';

    var scope,
        modal,
        Ctrl;

    beforeEach(module('app.component1'));

    beforeEach(inject(
        function($controller, $rootScope) {
            scope = $rootScope.$new();
            modal = {
                open: jasmine.createSpy('modal.open')
            };
            Ctrl = $controller('BookController', {
                $scope: scope,
                $modal: modal,
                books: function() {
                    return [{
                        'id': 1,
                        'version': 0,
                        'genre': 'genre',
                        'year': 2000,
                        'title': 'title',
                        'author': 'autor'
                    }];
                }
            });
        }));

    describe('Initial state of BookController', function() {

        it('should call controller properly', function() {
            //then
            expect(Ctrl).toBeDefined();
        });

        it('should open the modal during editing book', function() {
            //when
            scope.edit();
            //then
            expect(modal.open).toHaveBeenCalledWith(jasmine.objectContaining({
                templateUrl: '/component-1/modal-dialog/modal-dialog-update.tpl.html',
                controller: 'MyModalController',
                size: 'lg',
                resolve: {
                    selectedBook: jasmine.any(Function),
                    bookList: jasmine.any(Function)
                }
            }));
        });

        it('should open the modal during adding book', function() {
            //when
            scope.add();
            //then
            expect(modal.open).toHaveBeenCalledWith(jasmine.objectContaining({
                templateUrl: '/component-1/modal-dialog/modal-dialog-add.tpl.html',
                controller: 'MyModalController',
                size: 'lg',
                resolve: {
                    selectedBook: jasmine.any(Function),
                    bookList: jasmine.any(Function)
                }
            }));
        });
    });
});
