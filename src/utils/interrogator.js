/***
 * The interrogator which can be used to check what rules failed.
 * @returns {{addFailure: addFailure, setSucceeded: (function(*): *), getFirstFailureMessage: (function(): *), getFailureMessages: (function(): *[]), didSucceed: (function(): boolean), getFirstFailedRule: (function(): *)}}
 */
module.exports = function () {
    let rulesFailed = [];
    let succeeded = true;

    const addFailure = (rule) => {
        if(Array.isArray(rule)) {
            rulesFailed.push(...rule);
        } else {
            rulesFailed.push(rule);
        }
        succeeded = false;
    }
    const setSucceeded = (success) => succeeded = success;
    const getFirstFailedRule = () => rulesFailed[0];
    const getFirstFailureMessage = () => rulesFailed[0].failureMessage;
    const getFailureMessages = () => rulesFailed.map((v) => v.failureMessage);

    const didSucceed = () => succeeded;
    return {
        addFailure,
        setSucceeded,
        getFirstFailedRule,
        getFirstFailureMessage,
        didSucceed,
        getFailureMessages,
    }

}