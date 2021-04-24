const Refute = require('../../src');

describe('Pattern rules', () => {
    describe('Email check', () => {
        const validRules = {
            email: new Refute.PatternCheck('Failed').isEmail(),
        };
        it('Should return true when testing for an email and the email is valid', () => {
            const validIncomingEmail = {
                email: 'test@example.com'
            };

            expect(Refute.validate(validIncomingEmail, validRules).didSucceed()).toBe(true);
        });
        it('Should return false when testing for an email and the email is invalid', () => {
            const invalidIncomingEmail = {
                email: 'test.com'
            };
           expect(Refute.validate(invalidIncomingEmail, validRules).didSucceed()).toBe(false);
        });
    });

    describe('Phone number check', () => {
       const validRules = {
           phoneNumber: new Refute.PatternCheck('Failed').isPhoneNumber()
       };
       it('Should return true when testing for a phone number and the phone number is valid', () => {
          const validIncomingPhone = {
              phoneNumber: '+437340193847'
          };
          expect(Refute.validate(validIncomingPhone, validRules).didSucceed()).toBe(true);
       });
        it('Should return false when testing for a phone number and the phone number is invalid', () => {
            const invalidIncomingPhone = {
                phoneNumber: '2459isdkljgf'
            };
            expect(Refute.validate(invalidIncomingPhone, validRules).didSucceed()).toBe(false);
        });
    });

})