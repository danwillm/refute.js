const typeCompare = require('./typecompare');
const ruleSets = require('./rules');
const errors = require('./errors');

const setInterrogatorFail = (rule, interrogator) => {
    interrogator.rulesFailed.push(rule);
    interrogator.succeeded = false;
}

const checkRuleset = (data, rules, interrogator) => {
    if (!typeCompare.isArray(rules)) rules = [rules];

    for (const rule of rules) {
        if (typeCompare.isArray(rule)) {
            let succeeded = false;

            for (const ruleItem of rule)
                if (ruleItem.match(data)) succeeded = true;

            if(!succeeded) {
                setInterrogatorFail(rule, interrogator);
            }

        } else {
            if (!rule.match(data, interrogator)) setInterrogatorFail(rule, interrogator);
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
                setInterrogatorFail(new ruleSets.FailAlways(errors.NO_DATA).match(data));
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
    ...ruleSets,
};
