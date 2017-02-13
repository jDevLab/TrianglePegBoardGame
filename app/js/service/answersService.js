'use strict';
angular.module('TriangleGame').service('answersService', ['$q', '$timeout', 'triangularMatrixFactory', function ($q, $timeout, triangularMatrixFactory) {
    /**@description Finds all the solutions for the selected configuration Triangle Peg Board Game.
    * Returns promisse.
    * @param {number} trHeight Number of rows game board.
    * @param {number} emptyNumber Number of free holes on the game board.
    * @return {object}
    */
    this.findAllSolutions = function (trHeight, emptyNumber) {
        var triangularMatrix = triangularMatrixFactory.createMatrix(trHeight, emptyNumber);
        var defer = $q.defer();
        $timeout(function () {
            defer.resolve(findAnswers(triangularMatrix));
        }, 0);
        return defer.promise;
    };

    /**@description Recursively looking for solutions.
    * @param {object} tr Model of triangular game board.
    * @return {array}
    */
    function findAnswers(tr) {
        var answers = []; //array of all solutions
        var way = []; //current array of moves
        (function recursiveFind() {
            //continue to search for solutions is on the game board of not less than 2 active holes
            if (tr.activeCount > 1) {
                for (var i = 0; i < tr.length; i++) {
                    //skip occupied holes
                    if (tr[i].isActive)
                        continue;
                    //view all the neighbors of the selected holes
                    for (var j = 0; j < 6; j++) {
                        var el = tr[i].neighbors[j];
                        // skip all empty holes
                        if (!(el && el.isActive && el.neighbors[j] && el.neighbors[j].isActive))
                            continue;
                        tr.makeStep(i, j); 
                        way[way.length] = el.neighbors[j].number + '>' + (i + 1); //save step
                        recursiveFind(); //find the next move
                        tr.goBack(i, j); //return model to a previous state
                        way.length--; //delete the last step
                    }
                }
            }
            else {
                answers[answers.length] = way.slice(); //add a new solution
            }
        })();
        return answers;
    }
}])