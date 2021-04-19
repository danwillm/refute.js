const refute = require('../src/refute');




describe('Refute should pass when', () => {
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
        firtname: refute.types.number,
    }
    test('firstname is set to string', () => {
        expect(refute.validate(validData, validRules, (what) => 'Should not fail')).toBe(true);
    });
});

describe('Refute should fail when', () => {


});
