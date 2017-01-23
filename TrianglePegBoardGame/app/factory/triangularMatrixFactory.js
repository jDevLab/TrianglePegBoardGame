triangleGame.factory("triangularMatrixFactory", function () {
    return {
        createMatrix: function (trHeight, emptyNumber) {
            var triangleHeight = trHeight > 0 ? trHeight : 5;
            var elementsNumber = (triangleHeight + 1) / 2 * triangleHeight;
            var i, j;
            var triangle = new Array(elementsNumber);
            triangle.activeCount = elementsNumber - 1;
            triangle.makeStep = function (end, route) {
                this[end].isActive = true;
                this[end].neighbors[route].isActive = this[end].neighbors[route].neighbors[route].isActive = false;
                this.activeCount--;
            }
            triangle.back = function (end, route) {
                this[end].isActive = false;
                this[end].neighbors[route].isActive = this[end].neighbors[route].neighbors[route].isActive = true;
                this.activeCount++;
            }
            for (i = 0; i < triangle.length; i++) {
                triangle[i] = {};
            }
            var num = 0;
            for (i = 0; i < triangleHeight; i++) {
                //место
                for (j = 0; j <= i; j++) {
                    triangle[num].number = num + 1;
                    triangle[num].isActive = true;
                    triangle[num].neighbors = [
                        (i - 1 >= 0 && j - 1 >= 0) ? triangle[num - i - 1] : null,
                        (i - 1 >= 0 && j <= i - 1) ? triangle[num - i] : null,
                        (j + 1 <= i) ? triangle[num + 1] : null,
                        (i + 1 < triangleHeight) ? triangle[num + i + 2] : null,
                        (i + 1 < triangleHeight) ? triangle[num + i + 1] : null,
                        (j - 1 >= 0) ? triangle[num - 1] : null
                    ];
                    num++;
                }
            }
            triangle[emptyNumber ? emptyNumber - 1 : 0].isActive = false;
            return triangle;
        }
    }
})