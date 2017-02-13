'use strict';
describe('mainController', function () {
    var $scope,
        ctrl,
        answersService;
    
    beforeEach(module('TriangleGame'));

    beforeEach(inject(['$controller', '$rootScope', '$compile', 'answersService',
        function ($controller, $rootScope, $compile, _answersService_) {
            $scope = $rootScope.$new();
            ctrl = $controller('mainController', { $scope: $scope });
            answersService = _answersService_;
        }]));
    
    it('control options must be initialized', function () {
        expect(ctrl.heightTextBoxOptions).not.toBeUndefined();
        expect(ctrl.emptyNumberTextBoxOptions).not.toBeUndefined();
        expect(ctrl.mainGridOptions).not.toBeUndefined();
    })

    describe('heightTextBox', function () {
        beforeEach(inject(['$compile', function ($compile) {
            $scope.mainCtrl = ctrl;
            var template = '<input class="right-indent" kendo-numeric-text-box="heightTextBox" k-options="mainCtrl.heightTextBoxOptions" />';
            var element = $compile(template)($scope)
        }]));

        it('control must be initialized', function () {
            expect($scope.heightTextBox).not.toBeUndefined();
        })

        it('value of control must be initialized', function () {
            expect($scope.heightTextBox.value()).not.toBeUndefined();
        })
    });

    describe('emptyNumberTextBox', function () {
        beforeEach(inject(['$compile', function ($compile) {
            $scope.mainCtrl = ctrl;
            var template = '<input class="right-indent" kendo-numeric-text-box="emptyNumberTextBox" k-options="mainCtrl.emptyNumberTextBoxOptions" />';
            var element = $compile(template)($scope)
        }]));

        it('control must be initialized', function () {
            expect($scope.emptyNumberTextBox).not.toBeUndefined();
        })

        it('value of control must be initialized', function () {
            expect($scope.emptyNumberTextBox.value()).not.toBeUndefined();
        })
    });
     
    describe('mainGrid', function () {
        beforeEach(inject(['$compile', function ($compile) {
            $scope.mainCtrl = ctrl;
            var template ='<div kendo-grid="mainGrid" options="mainCtrl.mainGridOptions"></div>';
            var element = $compile(template)($scope)
        }]));

        it('control must be initialized', function () {
            expect($scope.mainGrid).not.toBeUndefined();
        })
    });

    describe('onFindBtnClick', function () {
        beforeEach(inject(['$compile', function ($compile) {
            $scope.mainCtrl = ctrl;
            var template = '<input class="right-indent" kendo-numeric-text-box="heightTextBox" k-options="mainCtrl.heightTextBoxOptions" />'
                + '<input class="right-indent" kendo-numeric-text-box="emptyNumberTextBox" k-options="mainCtrl.emptyNumberTextBoxOptions" />'
                + '<div kendo-grid="mainGrid" options="mainCtrl.mainGridOptions"></div>';
            var element = $compile(template)($scope)
        }]));

        it('in function must be called method findAllSolutions of answersService', function () {
            spyOn(answersService, 'findAllSolutions')
            try {
                ctrl.onFindBtnClick();
            } catch (err) { }
            expect(answersService.findAllSolutions).toHaveBeenCalled()
        });
    });
});