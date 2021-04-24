const Rule = require('./rule');

const patterns = {
    phoneNumber: `^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$`,
    email: `(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])`,
};

class PatternCheck extends Rule {
    constructor(failureMessage) {
        super(failureMessage);
    }

    isEmail() {
        this._rules.push(data => new RegExp(patterns.email).test(data));

        return this;
    }

    isPhoneNumber() {
        this._rules.push(data => new RegExp(patterns.phoneNumber).test(data));

        return this;
    }

    isCustomExpression(exp) {
        this._rules.push(data => new RegExp(exp).test(data));

        return this;
    };
}

module.exports = PatternCheck;