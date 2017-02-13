'use strict';
describe('answersService', function () {
    var service,
        trFactory;

    beforeEach(module('TriangleGame'));

    beforeEach(inject(['answersService', 'triangularMatrixFactory', function (_service, _trFactory) {
        service = _service;
        trFactory = _trFactory;
    }]));

    it('must have a method findAllSolutions', function () {
        expect(service.findAllSolutions).not.toBeUndefined();
        expect(typeof service.findAllSolutions).toBe('function');
    });
    describe('findAllSolutions', function () {
        it('in function must be called method createMatrix of triangularMatrixFactory', function () {
            spyOn(trFactory, 'createMatrix');
            service.findAllSolutions(5, 1);
            expect(trFactory.createMatrix).toHaveBeenCalled()
        });

        it('must return value', function () {
            expect(service.findAllSolutions(5, 1)).not.toBeUndefined(true);
        });
    });
});