'use strict';
angular.module('TriangleGame').factory('commonFunctionsFactory', [function () {
    return {
        sumOfSeries: _sumOfSeries,
    }
    /**@description Calculates the sum of terms of an arithmetic progression from 1 to n
    * @param {number} n The last term of the series.
    * @return {number}
    */
    function _sumOfSeries(n) {
        return n * (n + 1) / 2;
    };
}])