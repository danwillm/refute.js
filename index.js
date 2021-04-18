const errors = {
    UNEXPECTED_DATA: 'unexpected_data',
    WRONG_TYPE: 'wrong_type',
    NO_DATA: 'no_data',
};

const types = {
    string: 'string',
    number: 'number',
}


const isObject = (data) => typeof data === 'object' && data !== null;
const isArray = (data) => Array.isArray(data);
const isString = (data) => typeof data === 'string';


const ruleIsCheckable = (rule) => isArray(rule) || isString(rule);

const checkRule = (rule, data, onError) => {
    if (typeof data !== types[rule]) {
        onError(errors.WRONG_TYPE);
        return false;
    }
    return true;
};

const drillUntilCheckable = (data, rules, onError) => {
    if (ruleIsCheckable(rules)) {
        let success = true;
        if (isArray(rules)) {
            rules.forEach(e => {
                if (!checkRule(e, data, onError)) success = false;
            });
        } else {
            success = checkRule(rules, data, onError);
        }
        if (!success) return false;
    } else {
        for (let [k, v] of Object.entries(rules)) {
            if (data[k]) {
                if(!drillUntilCheckable(data[k], v, onError)) {
                    return false;
                }
            } else {
                onError(errors.NO_DATA);
                return false;
            }

        }
    }
    return true;
};

module.exports = {
    validate: (data, rules, onError) => drillUntilCheckable(data, rules, onError),
    types,
};
