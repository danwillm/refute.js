const refute = require('../src');
const errors = require('../src/errors');

describe('it should succeed when', () => {
    const validData = {
        firstname: 'john',
        lastname: 'appleseed',
        contactDetails: {
            email: 'test@example.com',
            phone: '+00000000000',
        }
    };

    test('all properties set correctly', () => {
        const validRules = {
            firstname: new refute.TypeCheck('Please enter a valid first name').isString(),
            lastname: new refute.TypeCheck('Please enter a valid last name').isString(),
            contactDetails: {
                email: new refute.PatternCheck('Please enter a valid email').isEmail(),
                phone: new refute.PatternCheck('Please enter a valid phone number').isPhoneNumber(),
            }
        }
        const result = refute.validate(validData, validRules);
        expect(result.succeeded).toBe(true);
    });

    test('data is present but no rule associated with it', () => {
        const validRules = {
            firstname: new refute.TypeCheck('Please enter a firstname').isString(),
        }
        const result = refute.validate(validData, validRules);

        expect(result.succeeded).toBe(true);
    });

    test('there are two checks on a field', () => {
        const validRules = {
            contactDetails: {
                email: [new refute.TypeCheck('Please enter an email').isString(), new refute.PatternCheck('Please enter a valid email').isEmail()],
            }
        };

        const result = refute.validate(validData, validRules);

        expect(result.succeeded).toBe(true);
    });

    test('there are two checks on a field, with an element containing an array for logical or', () => {
        const validRules = {
            contactDetails: {
                email: [[new refute.TypeCheck('Please enter string email').isString(), new refute.TypeCheck('Please enter an email').isNumber()], new refute.PatternCheck('Please enter a valid email').isEmail()],
            }
        };

        const result = refute.validate(validData, validRules);

        expect(result.succeeded).toBe(true);
    });

});

describe('Refute should throw when', () => {
    test('No type is associated with TypeCheck', () => {

        expect(() => refute.validate({
                firstname: 'Test'
            },
            {
                firstname: new refute.TypeCheck('Should fail'),
            })).toThrow(errors.NO_CHECK_SET);
    });
    test('No type is associated with PatternCheck', () => {

        expect(() => refute.validate({
                firstname: 'Test'
            },
            {
                firstname: new refute.PatternCheck('Should fail'),
            })).toThrow(errors.NO_CHECK_SET);
    });
});

describe('Refute should not succeed when', () => {
    const validRules = {
        firstname: new refute.TypeCheck('Please enter a valid first name').isString(),
        lastname: new refute.TypeCheck('Please enter a valid last name').isString(),
        contactDetails: {
            email: new refute.PatternCheck('Please enter a valid email').isEmail(),
            phone: new refute.PatternCheck('Please enter a valid phone number').isPhoneNumber(),
        }
    };

    const invalidData = {
        firstname: 1,
        lastname: new Date(),
        contactDetails: {
            email: 'example.com',
            phone: 12345,
        }
    };

    test('TypeCheck does not match with data provided', () => {
        expect(refute.validate(invalidData, validRules).succeeded).toBe(false);
    });
})