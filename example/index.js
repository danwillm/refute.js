const Refute = require('../src');

const failureRules = {
    firstname: new Refute.StringCheck('Invalid Firstname').lengthGreaterThan(4),
    lastname: new Refute.StringCheck('Invalid Lastname').lengthLessThan(10),
    email: new Refute.PatternCheck('Invalid Email').isEmail(),
};
const failureData = {
    firstname: 123,
    lastname: '1234567890123456677',
    email: 'abc.com',
};

const result = Refute.validate(failureData, failureRules);

if(!result.didSucceed()) {
    console.log("failed");

    console.log(result.getFirstFailureMessage());
}