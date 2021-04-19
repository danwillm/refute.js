const errors = require('./errors');
const typeCompare = require('./typecompare');

const types = {
    string: 'string',
    number: 'number',
}

class Rule {
    failureMessage;
    checkedWith

    constructor(failureMessage) {
        this.failureMessage = failureMessage;
    };

    match(data) {
        throw 'Not implemented'
    };

    getFailureMessage() {
        return this.failureMessage;
    };

    setCheckedWith(checkedWith) {
        this.checkedWith = checkedWith;
    }
}

module.exports = {
    Rule,
    TypeCheck: class TypeCheck extends Rule {
        type;

        /***
         * Constructs an instance to check
         * @param typeSet {types}
         * @param failureMessage
         */
        constructor(typeSet, failureMessage) {
            super(failureMessage);
            this.type = typeSet;
        };

        /***
         * Matches a value and sets the interrogator accordingly
         * @param data
         * @param interrogator
         */
        match(data, interrogator) {
            super.setCheckedWith(data);

            if (typeof data !== this.type) {
                interrogator.rulesFailed.push(this);
                interrogator.succeeded = false;
            }
        };

        getFailureMessage() {
            return super.getFailureMessage();
        }
    },

    StringCheck: class StringCheck extends Rule {

    },

    FailAlways: class FailAlways extends Rule {
        constructor(failureMessage) {
            super(failureMessage);
        };

        match(data, interrogator) {
            super.setCheckedWith(data);

            interrogator.rulesFailed.push(this);
            interrogator.succeeded = false;
        };
    },

    types,
}
