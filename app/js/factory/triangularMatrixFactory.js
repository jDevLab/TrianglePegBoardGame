'use strict';
angular.module('TriangleGame').factory('triangularMatrixFactory', ['commonFunctionsFactory', function (commonFn) {
    return {
        createMatrix: _createMatrix,
    };

    /**@description It creates an array, which is a model of triangular game board. The array size is determined by the parameter triangleHeight.
    * The array elements are initialized with an object in which the value of the current element(true/false), number and links to neighboring elements.
    * The object of array receives field activeCount and metods: makeStep, goBack.
    * @param {number} triangleHeight Number of rows game board.
    * @param {number} emptyNumber Number of free holes on the game board.
    * @return {object}
    */
    function _createMatrix(triangleHeight, emptyNumber) {
        var _trHeight = triangleHeight >= 3 ? triangleHeight : 5;
        var _emptyHoleIndex = emptyNumber ? emptyNumber - 1 : 0

        var _elementsNumber = commonFn.sumOfSeries(_trHeight);

        var triangle = _createAndInitializeArr(_elementsNumber, _trHeight);
        triangle[_emptyHoleIndex].isActive = false;
        triangle.activeCount = _elementsNumber - 1;
        triangle.makeStep = _makeStep;
        triangle.goBack = _goBack;

        return triangle;
    };

    /**@description Make the next step. Reduces the number of active elements.
    * @param {number} end Number of empty holes.
    * @param {number} route The index in the array of neighbors(No. jump direction).
    */
    function _makeStep(end, route) {
        this[end].isActive = true;
        this[end].neighbors[route].isActive = this[end].neighbors[route].neighbors[route].isActive = false;
        this.activeCount--;
    };

    /**@description Returns the model of game board to a previous state. Increases the number of active elements.
    * @param {number} pos Number of holes.
    * @param {number} route The index in the array of neighbors(No. jump direction).
    */
    function _goBack(pos, route) {
        this[pos].isActive = false;
        this[pos].neighbors[route].isActive = this[pos].neighbors[route].neighbors[route].isActive = true;
        this.activeCount++;
    };

    /**@description It creates an array, which is a triangular model game board. The array size is determined by the parameter triangleHeight.
    * The array elements are initialized with an object in which the value of the current element(true/false), number and links to neighboring elements.
    * @param {number} trHeight Number of rows game board.
    * @param {number} elNumber The number of holes on the game board.
    * @return {array}
    */
    function _createAndInitializeArr(elNumber, trHeight) {
        var arr = [];
        for (var i = 0; i < elNumber; i++) {
            arr[i] = {};
        };
        var num = 0; // ordinal number of the element in array
        for (var i = 0; i < trHeight; i++) {
            // i -- line number of game board
            for (var j = 0; j <= i; j++) {
                // j -- item number in the line
                arr[num].number = num + 1;
                arr[num].isActive = true;
                /*Every element game board can have no more than 6 neighbors:
                * 0 - upper-left, 1 - upper-right, 2 - right,
                * 3 - bottom-right, 4 - bottom-left, 5 - left.
                * Elements located on the triangle edges are not all neighbors.
                */
                arr[num].neighbors = [
                    (i >= 1 && j >= 1) ? arr[num - i - 1] : null,
                    (i >= 1 && j <= i - 1) ? arr[num - i] : null,
                    (j + 1 <= i) ? arr[num + 1] : null,
                    (i + 1 < trHeight) ? arr[num + i + 2] : null,
                    (i + 1 < trHeight) ? arr[num + i + 1] : null,
                    (j - 1 >= 0) ? arr[num - 1] : null
                ];
                num++;
            }
        };
        return arr;
    };
}])