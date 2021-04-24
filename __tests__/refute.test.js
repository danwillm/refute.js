const Refute = require('../src');

describe('Refute main functions', () => {
    const validRules = {
        firstname: new Refute.StringCheck('Invalid Firstname').lengthGreaterThan(4),
        lastname: new Refute.StringCheck('Invalid Lastname').lengthLessThan(10),
        email: new Refute.PatternCheck('Invalid Email').isEmail(),
    };
    describe('When rules succeed', () => {

        const validData = {
            firstname: 'Firstname',
            lastname: 'Lastname',
            email: 'example@example.com'
        };
        const result = Refute.validate(validData, validRules);

        it('Should return true from didSucceed()', () => {
            expect(result.didSucceed()).toBe(true);
        });
    });
    describe('When rules fail', () => {
        const invalidData = {
            firstname: 123,
            lastname: '1234567890123456677',
            email: 'abc.com',
        };
        const result = Refute.validate(invalidData, validRules);

        it('Should return false from didSucceed()', () => {
            expect(result.didSucceed()).toBe(false);
        });
        it(`Should return 'Invalid Firstname' from get first failure message`, () => {
            expect(result.getFirstFailureMessage()).toEqual('Invalid Firstname');
        });
        it('Should return an array of the invalid messages from get failure messages', () => {
            expect(result.getFailureMessages()).toEqual(['Invalid Firstname', 'Invalid Lastname', 'Invalid Email']);
        });
    })
});