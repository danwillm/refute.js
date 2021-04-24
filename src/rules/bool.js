const Rule = require('./rule');

class BoolCheck extends Rule {
    constructor(failureMessage) {
        super(failureMessage);
    }

    isTrue() {
        this._rules.push(d => d === true);

        return this;
    }
}

module.exports = BoolCheck;