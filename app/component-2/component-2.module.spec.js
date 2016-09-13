describe('component-2 module test', function() {
    'use strict';
    var routeProvider;

    beforeEach(function() {
        module('ngRoute', function($routeProvider) {
            routeProvider = $routeProvider;
            spyOn(routeProvider, 'when').and.callThrough();
        });
        module('app.component2');
    });

    beforeEach(inject());

    it('defines a route for the dialog-b', function() {
        expect(routeProvider.when).toHaveBeenCalledWith('/component-2/dialog-b', {
            templateUrl: 'component-2/dialog-b/dialog-b.html',
            controller: 'FilterController'
        });
    });
});
