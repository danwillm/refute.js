const errors = require('./errors');

const Pattern = {
    phoneNumber: `^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$`,
    email: `(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])`,
}

class Rule {
    failureMessage;
    _rules = [];

    constructor(failureMessage) {
        this.failureMessage = failureMessage;
    };

    match(data) {
        if(this._rules.length === 0) throw new Error(errors.NO_CHECK_SET);

        for (const rule of this._rules) {
            if(!rule(data)) return false;
        }
        return true;
    };

    getFailureMessage() {
        return this.failureMessage;
    };
}


module.exports = {

    /***
     * Check for specific type
     * @extends Rule
     */
    TypeCheck: class TypeCheck extends Rule {

        /***
         * Constructs a TypeCheck Rule
         * @param {String} failureMessage Message to throw on error
         */
        constructor(failureMessage) {
            super(failureMessage);
        };
        isString() {
            this._rules.push(data => typeof data === 'string');

            return this;
        }

        isNumber() {
            this._rules.push(data => typeof data === 'number');

            return this;
        }

    },

    PatternCheck: class PatternCheck extends Rule {
        constructor(failureMessage) {
            super(failureMessage);
        }

        isEmail() {
            this._rules.push(data => new RegExp(Pattern.email).test(data));

            return this;
        }

        isPhoneNumber() {
            this._rules.push(data => new RegExp(Pattern.phoneNumber).test(data));

            return this;
        }

        customExpression(exp) {
            this._rules.push(data => new RegExp(exp).test(data));

            return this;
        }
    },

    StringCheck: class StringCheck extends Rule {
        constructor(failureMessage) {
            super(failureMessage);

            return this;
        };

        lengthLessThan(length) {
            this._rules.push(data => data.length < length);

            return this;
        };

        lengthGreaterThan(length) {
            this._rules.push(data => data.length > length);

            return this;
        }
    },

    FailAlways: class FailAlways extends Rule {
        constructor(failureMessage) {
            super(failureMessage);

            return this;
        };

        match(data) {
            return false;
        };

    },
    Rule,
}
