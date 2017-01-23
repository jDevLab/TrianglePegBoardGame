triangleGame.service('answersService', function ($q, $timeout, triangularMatrixFactory) {
    function findAnswers(tr) {
        var answers = [];
        var way = [];
        (function recursive() {
            if (tr.activeCount > 1) {
                for (var i = 0; i < tr.length; i++) {
                    if (!tr[i].isActive) {
                        for (var j = 0; j < 6; j++) {
                            var el = tr[i].neighbors[j];
                            if (el && el.isActive && el.neighbors[j] && el.neighbors[j].isActive) {
                                way[way.length] = el.neighbors[j].number + ">" + (i + 1);
                                tr.makeStep(i, j);
                                recursive();
                                //вернуться к предыдущему состоянию
                                tr.back(i, j);
                                way.length--;
                            }
                        }
                    }
                }
            }
            else {
                answers[answers.length] = way.slice();
            }
        })();
        return answers;
    }

    return {
        getAnswers: function (trHeight, emptyNumber) {
            var triangularMatrix = triangularMatrixFactory.createMatrix(trHeight, emptyNumber)
            var defer = $q.defer();
            $timeout(function () {
                defer.resolve(findAnswers(triangularMatrix));
            }, 0);
            return defer.promise;
        }
    }
})