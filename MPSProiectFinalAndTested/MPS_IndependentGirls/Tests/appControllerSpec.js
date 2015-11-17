/// <reference path="../scripts/angular.js" />
/// <reference path="../scripts/angular-mocks.js" />
/// <reference path="../content/js/lettersController.js" />
/// <reference path="../scripts/_references.js" />

describe('', function () {
    //initialize Angular
    beforeEach(module('myApp'));
    //parse out the scope for use in our unit tests.
    var scope;
    var ctrl;
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('letters', { $scope: scope });
    }));

    it("Pornire joc -> afisare interfata", function () {
        scope.startWithRandom9Letters();
        expect(scope.tableVisible).toBe(true);
        expect(scope.inputVisible).toBe(true);
    });

    it("Pornire joc -> generare litere", function () {
        scope.startWithRandom9Letters();
        expect(scope.nineLetters.length).toBe(9);
    });

    it("Verificare joc -> afisare mesaje", function () {
        var score = scope.checkWords();
        expect(score).toBe(0);
        expect(scope.tableVisible).toBe(false);
        expect(scope.inputVisible).toBe(false);
    });
});