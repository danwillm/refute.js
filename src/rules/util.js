const Rule = require('./rule');

class FailAlways extends Rule {
    constructor(failureMessage) {
        super(failureMessage);

        return this;
    };

    match(data) {
        return false;
    }
}

module.exports = {
    FailAlways,
}