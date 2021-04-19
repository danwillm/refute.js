const typeCompare = require('./typecompare');
const RuleSets = require('./rules');
const errors = require('./errors');

const setInterrogatorFail = (rule, interrogator) => {
    if (!typeCompare.isArray(rule)) rule = [rule];

    interrogator.rulesFailed.push(...rule);
    interrogator.succeeded = false;
}

/***
 *
 * @param data
 * @param rules {Array.<RuleSets.Rule> | RuleSets.Rule}
 * @param interrogator
 */
const checkRuleset = (data, rules, interrogator) => {
    if (!typeCompare.isArray(rules)) rules = [rules];


    for (const rule of rules) {
        if (typeCompare.isArray(rule)) {

            let succeeded = false;
            let failedRules = [];

            for (const ruleItem of rule) {
                if (ruleItem.match(data)) {
                    succeeded = true;
                    break;
                }
                failedRules.push(ruleItem);
            }
            if (!succeeded) {
                setInterrogatorFail(failedRules, interrogator);
            }
        } else {
            if (!rule.match(data)) {
                setInterrogatorFail(rule, interrogator);
                break;
            }
        }
    }
};
/***
 *
 * @param data
 * @param rules
 * @param interrogator
 */
const drillUntilCheckable = (data, rules, interrogator) => {
    if (typeCompare.ruleIsCheckable(rules)) {
        checkRuleset(data, rules, interrogator);
    } else {
        for (let [k, v] of Object.entries(rules)) {
            if (data[k]) {
                drillUntilCheckable(data[k], v, interrogator);
            } else {
                setInterrogatorFail(new RuleSets.FailAlways(errors.NO_DATA).match(data));
            }

        }
    }
};

module.exports = {
    validate: (data, rules) => {
        let interrogator = {
            rulesFailed: [],
            succeeded: true,
        }

        drillUntilCheckable(data, rules, interrogator);

        return interrogator;
    },
    ...RuleSets,
};
