triangleGame.controller("mainController", function ($scope, answersService) {
    var triangleHeight = 5;
    var emptyNumber = 1;
    $scope.heightTextBoxOptions = {
        min: 3,
        max: 5,
        value: triangleHeight,
        format: "0",
        change: function () {
            var value = this.value();
            var max = (value + 1) / 2 * value;
            $scope.emptyNumberTextBox.max(max);
            var val = $scope.emptyNumberTextBox.value();
            $scope.emptyNumberTextBox.value(val > max ? max : val);
        },
        spin: function () {
            var value = this.value();
            var max = (value + 1) / 2 * value;
            $scope.emptyNumberTextBox.max(max);
            var val = $scope.emptyNumberTextBox.value();
            $scope.emptyNumberTextBox.value(val > max ? max : val);
        }
    };
    $scope.emptyNumberTextBoxOptions = {
        min: 1,
        max: (triangleHeight + 1) / 2 * triangleHeight,
        value: emptyNumber,
        format: "0"
    };
    $scope.mainGridOptions = {
        pageable: {
            pageSize: 20
        }
    }

    $scope.onFindBtnClick = function () {
        answersService.getAnswers($scope.heightTextBox.value(), $scope.emptyNumberTextBox.value())
            .then(function (dataArray) {
                if (dataArray.length) {
                    $scope.mainGrid.setOptions({
                        columns: (function () {
                            var columns = [];
                            for (var i in dataArray[0])
                                columns.push({ field: '[' + i + ']', title: (+i + 1) + " ход", width: "30px" });
                            return columns;
                        })(),
                        dataSource: dataArray
                    });
                }
                else {
                    $scope.mainGrid.setOptions({
                        dataSource: [],
                        columns: (function () {
                            var columns = [];
                            var moveCount = ($scope.heightTextBox.value() + 1) / 2 * $scope.heightTextBox.value() - 2;
                            for (var i = 0; i < moveCount;i++)
                                columns.push({ field: '[' + i + ']', title: (i + 1) + " ход", width: "30px" });
                            return columns;
                        })()
                    });
                    alert("Решений нет");
                }
            });
    }

})