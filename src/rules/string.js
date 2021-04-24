const Rule = require('./rule');

class StringCheck extends Rule {
    constructor(failureMessage) {
        super(failureMessage);

        return this;
    };

    lengthLessThan(length) {
        this._rules.push(data => (data.length < length));

        return this;
    };

    lengthGreaterThan(length) {
        this._rules.push(data => (data.length > length));

        return this;
    };

    equalTo(comparison) {
        this._rules.push(data => data === comparison)
    }
}

module.exports = StringCheck;
