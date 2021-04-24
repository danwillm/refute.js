const Refute = require('../../src');

describe('Bool Check', () => {
    describe('isTrue', () => {
        const validRules = {
            isAdmin: new Refute.BoolCheck('Should not fail').isTrue(),
        };

        it('Should return true when data is true', () => {
            const validData = {
                isAdmin: true,
            };

            expect(Refute.validate(validData, validRules).didSucceed()).toBe(true);
        });

        it('Should return false when data is false', () => {
            const invalidData = {
                isAdmin: false,
            };

            expect(Refute.validate(invalidData, validRules).didSucceed()).toBe(false);
        });
        it('Should return false when no data', () => {
            const invalidData = {};

            expect(Refute.validate(invalidData, validRules).didSucceed()).toBe(false);
        });
    });
})