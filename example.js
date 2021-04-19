const refute = require('./src/refute');

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
    firstname: new refute.TypeCheck(refute.types.string, 'no firstname'),
    contactDetails: {
        email: new refute.TypeCheck(refute.types.number, 'no email'),
    }
}

const result = refute.validate(validData, validRules);

console.log(result.rulesFailed);

if(result.succeeded) {
    console.log("did succeed");
} else {
    console.log("did fail");
}
