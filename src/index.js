#!/usr/bin/env node

const typeCompare = require('./utils/typecompare');
const RuleSets = require('./rules');
const errors = require('./utils/errors');
const Interrogator = require('./utils/interrogator');

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
                failedRules.forEach(r => interrogator.addFailure(r));
            }
        } else {
            if (!rule.match(data)) {
                interrogator.addFailure(rule);
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
                interrogator.addFailure(new RuleSets.UtilChecks.FailAlways(errors.NO_DATA).match(data));
            }

        }
    }
};

module.exports = {
    validate: (data, rules) => {
        let interrogator = new Interrogator();
        drillUntilCheckable(data, rules, interrogator);

        return interrogator;
    },
    ...RuleSets,
};
