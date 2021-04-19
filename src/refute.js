const typeCompare = require('./typecompare');
const ruleSets = require('./rules');
const errors = require('./errors');




const checkRuleset = (data, rules, interrogator) => {
    if (!typeCompare.isArray(rules)) rules = [rules];

    for (const rule of rules) {
        rule.match(data, interrogator);
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
                new ruleSets.FailAlways(errors.NO_DATA).match(data, interrogator);
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
