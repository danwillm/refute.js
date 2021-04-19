const errors = require('./errors');
const typeCompare = require('./typecompare');

const Type = {
    string: 'string',
    number: 'number',
};

const Pattern = {
    phoneNumber: `^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$`,
    email: `(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])`,
}

class Rule {
    failureMessage;

    constructor(failureMessage) {
        this.failureMessage = failureMessage;
    };

    match(data) {
        throw 'Not implemented'
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
            let _types = [];

            this.isString = () => {
                _types.push(Type.string);

                return this;
            }

            this.isNumber = () => {
                _types.push(Type.number);

                return this;
            }

            this.match = (data) => {
                if(_types.length === 0) throw new Error(errors.NO_CHECK_SET);

                for (const typeItem of _types) {
                    if (typeof data !== typeItem) return false;
                }
                return true;
            }
        };
    },

    PatternCheck: class PatternCheck extends Rule {
        constructor(failureMessage) {
            super(failureMessage);

            let _patterns = [];

            this.isPhoneNumber = () => {
                _patterns.push(Pattern.phoneNumber);

                return this;
            };

            this.isEmail = () => {
                _patterns.push(Pattern.email);
                return this;
            };

            this.customExpression = (exp) => {
                _patterns.push(exp);

                return this;
            }

            this.match = (data) => {
                if(_patterns.length === 0) throw new Error(errors.NO_CHECK_SET);
                for(const patternItem of _patterns) {
                    const regExp = new RegExp(patternItem);
                    if(!regExp.test(data)) return false;
                }
                return true;
            }
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
