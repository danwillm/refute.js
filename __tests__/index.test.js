const refute = require('../src');




describe('When the data entered is valid, it should', () => {
    const validData = {
        firstname: 'john',
        lastname: 'appleseed',
        contactDetails: {
            email: 'test@example.com',
            phone: '+00000000000',
        },
        favouriteColours: ['blue', 'green']
    };
    const validRules = {
        firtname: new refute.RuleSets.TypeCheck(refute.RuleSets.),
    }
    test('Pass when all properties set correctly', () => {
        expect(refute.validate(validData, validRules, (what) => 'Should not fail')).toBe(true);
    });
});

describe('Refute should fail when', () => {


});
