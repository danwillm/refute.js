const rules = require('../rules');

const isObject = (data) => typeof data === 'object' && data !== null;
const isArray = (data) => Array.isArray(data);
const isString = (data) => typeof data === 'string';

module.exports = {
    ruleIsCheckable: (rule) => isArray(rule) || rule instanceof rules.Rule,

    isObject,
    isArray,
    isString,
};
