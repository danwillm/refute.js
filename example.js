const Refute = require('./src');

const validData = {
    firstname: 'john',
    lastname: 'appleseed',
    contactDetails: {
        email: 'test@gmail.com',
        phone: '+447858601258',
    },
    favouriteColours: ['blue', 'green']
};
const validRules = {
    firstname: new Refute.TypeCheck('Please enter a firstname').isString(),
    lastname: new Refute.TypeCheck('Please enter a lastname').isString(),
    contactDetails: {
        email: [new Refute.TypeCheck('Please enter an email').isString(), new Refute.PatternCheck('Please enter a valid email').isEmail()],
        phone: [new Refute.PatternCheck('Please enter a valid phone number').isPhoneNumber()],
    }
}

const result = Refute.validate(validData, validRules);


if (result.succeeded) {
    console.log("Successfully validated");
} else {
    console.log("did fail");
    console.log(result.rulesFailed);
}
