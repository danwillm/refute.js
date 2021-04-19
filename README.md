# RefuteJS

## Simple Data Validation

### An example
Define how you want data to be structured:
```javascript
const myRules = {
    firstname: new Refute.TypeCheck('Please enter a firstname').isString(),
    lastname: new Refute.TypeCheck('Please enter a lastname').isString(),
    contactDetails: {
        email: [
            new Refute.TypeCheck('Please enter an email').isString(),
            new Refute.PatternCheck('Please enter a valid email').isEmail()
        ],
        phone: [new Refute.PatternCheck('Please enter a valid phone number').isPhoneNumber()],
    }
};
```

Validate the rules:

```javascript
const result = Refute.validate(validData, validRules);

if(result.succeeded) {
    //All good!
} else {
    result.rulesFailed.forEach(rule => {
        //interrogate what rules failed
    })
}
```

## Structure
* Your rule object layout describes the structure you expect your data to be in
* An array of rules acts as a logical "AND", where all array elements must pass for the data to be valid
* An array inside an array element acts as a logical "OR", where only one of the elements needs to be successful to pass

