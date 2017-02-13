'use strict';
describe('triangularMatrixFactory', function () {
    var factory;

    beforeEach(module('TriangleGame'));    

    beforeEach(inject(['triangularMatrixFactory', function (_factory) {
        factory = _factory;
    }]));

    it('must have a method createMatrix', function () {
        expect(factory.createMatrix).not.toBeUndefined();
        expect(typeof factory.createMatrix).toBe('function');
    });

    describe('createMatrix', function () {
        it('must return an array', function () {
            expect(factory.createMatrix() instanceof Array).toBe(true);
        });
      
        it('must return an array with method makeStep', function () {
            expect(typeof factory.createMatrix().makeStep).toBe('function');
        });

        it('must return an array with method goBack', function () {
            expect(typeof factory.createMatrix().goBack).toBe('function');
        });

        it('must return an array with property activeCount', function () {
            expect(typeof factory.createMatrix().activeCount).toBe('number');
        });

        it('must appoint the right neighbors', function () {
            var arr = factory.createMatrix();
            expect(arr[4].neighbors[0]).toEqual(arr[1]);
            expect(arr[4].neighbors[1]).toEqual(arr[2]);
            expect(arr[4].neighbors[2]).toEqual(arr[5]);
            expect(arr[4].neighbors[3]).toEqual(arr[8]);
            expect(arr[4].neighbors[4]).toEqual(arr[7]);
            expect(arr[4].neighbors[5]).toEqual(arr[3]);
            expect(arr[0].neighbors[0]).toEqual(null);
            expect(arr[2].neighbors[1]).toEqual(null);
            expect(arr[3].neighbors[5]).toEqual(null);
        });

        it('should create the required number of elements in the array', function () {
            expect(factory.createMatrix().length).toBe(15);
            expect(factory.createMatrix(3).length).toBe(6);
            expect(factory.createMatrix(4).length).toBe(10);
        });
    })
});