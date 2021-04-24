const errors = require('../utils/errors');

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

module.exports = Rule;