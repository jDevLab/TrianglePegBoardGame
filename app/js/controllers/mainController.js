'use strict';
angular.module('TriangleGame')
    .controller('mainController', ['$scope', 'answersService', 'commonFunctionsFactory',
        /*When using the "Controller as" syntax, it was not possible to abandon the use of $scope inside the controller.
        * Because the Kendo controls create an object into $scope.
        */
        function ($scope, answersService, commonFn) {

    var triangleHeight = 5;
    var emptyNumber = 1;
    var holesNumber = commonFn.sumOfSeries(triangleHeight);

    //options for kendo numericTextBox control 
    this.heightTextBoxOptions = {
        min: 3,
        max: 5,
        value: triangleHeight,
        format: '0',
        change: _onHeightChange,
        spin: _onHeightChange
    };

    //options for kendo numericTextBox control 
    this.emptyNumberTextBoxOptions = {
        min: 1,
        max: holesNumber,
        value: emptyNumber,
        format: '0'
    };
    //options for kendo grid control 
    this.mainGridOptions = {
        pageable: {
            pageSize: 20
        }
    };

    /**@description Event handler. Call the search for solutions for Triangle Peg Board Game.
    * Update Kendo grid.
    */
    this.onFindBtnClick = function () {
        answersService.findAllSolutions($scope.heightTextBox.value(), $scope.emptyNumberTextBox.value())
            .then(function (dataArray) {
                $scope.mainGrid.setOptions({
                    dataSource: dataArray,
                    columns: _createGridColumns(),
                });
                if (!dataArray.length)
                    alert('Решений нет');

            });
    };

    /**@description Event handler. Update holesNumber and emptyNumberTextBox*/
    function _onHeightChange() {
        holesNumber = commonFn.sumOfSeries(this.value());
        $scope.emptyNumberTextBox.max(holesNumber);
        var val = $scope.emptyNumberTextBox.value();
        $scope.emptyNumberTextBox.value(val > holesNumber ? holesNumber : val);
    };

    /**@description Create array of Kendo grid columns*/
    function _createGridColumns() {
        var columns = [];
        for (var i = 0; i < (holesNumber - 2) ; i++)
            columns.push({ field: '[' + i + ']', title: (i + 1) + ' ход', width: '30px' });
        return columns;
    };
}])