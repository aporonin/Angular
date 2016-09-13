describe('component-1 module test', function() {
    'use strict';
    var routeProvider;

    beforeEach(function() {
        module('ngRoute', function($routeProvider) {
            routeProvider = $routeProvider;
            spyOn(routeProvider, 'when').and.callThrough();
        });
        module('app.component1');
    });

    beforeEach(inject());

    it('should define a route for the dialog-a', function() {
        expect(routeProvider.when).toHaveBeenCalledWith('/component-1/dialog-a', {
            templateUrl: 'component-1/dialog-a/dialog-a.html',
            controller: 'BookController'
        });
    });
});
