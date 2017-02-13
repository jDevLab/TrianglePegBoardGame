'use strict';
describe('commonFunctionsFactory', function () {
    var factory;

    beforeEach(module('TriangleGame'));    

    beforeEach(inject(['commonFunctionsFactory', function (_factory) {
        factory = _factory;
    }]));

    it('must have a method sumOfSeries', function () {
        expect(factory.sumOfSeries).not.toBeUndefined();
        expect(typeof factory.sumOfSeries).toBe('function');
    });

    describe('createMatrix', function () {
        it('must return an Number', function () {
            expect(typeof factory.sumOfSeries(4)).toBe('number');
        });
      

        it('must correctly calculate the sum of an arithmetic progression of members', function () {
            var sum = 0, i;
            for (i = 1; i <= 3; i++)
                sum += i;
            expect(factory.sumOfSeries(3)).toBe(sum);
            sum = 0
            for (i = 1; i <= 9; i++)
                sum += i;
            expect(factory.sumOfSeries(9)).toBe(sum);
        });
    })
});