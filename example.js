const refute = require('./index');

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
    firstname: refute.types.string,
    contactDetails: {
        email: refute.types.string,
    }
}

const result = refute.validate(validData, validRules, (err) => {
    console.log(err);
    return 'failed';
});

if(result) {
    console.log("Success validating rules");
} else {
    console.log("Failed to validate rules");
}
