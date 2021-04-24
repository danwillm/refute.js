const Rule = require('./rule');

class TypeCheck extends Rule {

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

}

module.exports = TypeCheck;