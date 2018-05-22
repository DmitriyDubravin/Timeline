import React from 'react';


export default class FormGen {
    constructor(data, ctx) {

        this.ctx = ctx;
        this.formData = data
            .map(field => {
                return {
                    ...field,
                    value: field.value !== undefined ? field.value : '',
                    required: field.required !== undefined ? field.required : false
                }
            })
            .map(field => {
                let value = field.name === 'currentPassword' ? this.ctx.props.x : field.value;
                return {
                    ...field,
                    value: value
                }
            });
        this.inputHandler = this.inputHandler.bind(this);
        this.formValidator = this.formValidator.bind(this);
    }

    getFormData() {
        return this.formData;
    }
    generateForm() {
        let form = this.ctx.state.form;
        return form
            .map((field, i) => {

                let isValid = form[i].isValid !== undefined ? form[i].isValid : true;
                let cls = field.cls !== undefined ? field.cls : '';
                if (!isValid) {
                    cls += ' error';
                }

                return {
                    ...field,
                    value: form[i].value,
                    cls: cls,
                    disabled: !this.ctx.state.isFormValid,
                    msg: form[i].msg,
                    onChange: this.inputHandler
                }
            })
            .map((field, i) => <field.component key={i} props={field} />);
    }

    ruleMinLength(value, ruleValue) {
        return value.length >= ruleValue ? '' : `min length: ${ruleValue} symbols`
    }
    ruleMaxLength(value, ruleValue) {
        return value.length <= ruleValue ? '' : `max length: ${ruleValue} symbols`
    }
    isEmail(value) {
        var rgx = /\S+@\S+\.\S+/; // yes, I don't bother too much
        return rgx.test(String(value).toLowerCase()) ? '' : `this is not an email`
    }
    matchTo(value, matchToField) {
        return value === matchToField.value ? '' : `should match with "${matchToField.name}" field`
    }



    validate(rules, value) {

        let results = [];

        for (let key in rules) {
            if (rules.hasOwnProperty(key)) {
                if (key === 'minLength') {
                    results.push(this.ruleMinLength(value, rules[key]));
                }
                if (key === 'maxLength') {
                    results.push(this.ruleMaxLength(value, rules[key]));
                }
                if (key === 'isEmail' && rules[key]) {
                    results.push(this.isEmail(value));
                }
                if (key === 'matchTo') {
                    let matchToField = this.ctx.state.form.filter(field => field.name === rules[key])[0];
                    results.push(this.matchTo(value, matchToField));
                }
            }
        }
        return results;
    }


    formValidator() {
        let isFormValid = this.ctx.state.form.every(field => {
            return field.required ? field.isValid : true;
        });

        this.ctx.setState({isFormValid});
    }

    inputHandler(event) {
        const {name, value} = event.target;

        let sss = this.ctx.state.form.map(field => {
            if (field.name === name) {

                let validationResult = this.ctx.form.validate(field.rules, value).filter(msg => msg.length > 0);

                let isValid = validationResult.length === 0;
                let msg = !isValid && validationResult[0];

                return {
                    ...field,
                    isValid: isValid,
                    value: value,
                    msg: msg
                }
            } else {
                return field
            }
        });

        this.ctx.setState(
            {...this.ctx.state, form: sss},
            this.formValidator
        );
    }


}