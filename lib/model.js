'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
require('backbone-super');

var Model = Backbone.Model.extend({

    initialize: function initialize(attributes, options) {

        this.options = options || {};

        this.options.formErrorMessage = this.options.formErrorMessage || Model.messages.formErrorMessage;

        if (this.options.formTagId) {
            this.form = $('#' + this.options.formTagId);
            this.form.on('submit', _.bind(function (e) {
                e.preventDefault();
                this.submit();
            }, this));
        }

        this._isValid = false;
        this.validation = this.options.validation;
        this.on('change', this.change, this);
        this.validate();
    },

    change: function change() {
        this.validate();
    },
    isValid: function isValid(options) {
        return this.validate(options);
    },
    validate: function validate(options) {

        options = options || {};
        options.displayErrors = options.displayErrors || false;

        this.errors = _.bind(Model.validate, this)(this.attributes, this.validation, {
            triggerEvents: true
        });
        this.trigger("validate", {
            displayErrors: options.displayErrors,
            isValid: this.errors._isValid,
            errors: this.errors
        });

        if (options.force == true) {
            this.trigger('force-validate', model, 'force-validate');
        }

        if (this.errors && this.errors._isValid == false) {
            this._isValid = false;
            return false;
        } else {
            this._isValid = true;
            return true;
        }
    },

    validateAttribute: function validateAttribute(key, options) {
        return Model.validateAttribute(key, options);
    },

    submit: function submit() {

        this.validate({ displayErrors: true });

        if (this._isValid == true) {
            if (this.form) {

                if (this.form.find('.ui-form-messages').length) {
                    this.form.find('.ui-form-messages').html();
                }

                this.form.off('submit');
                this.form[0].submit();
            }
        } else {
            if (this.form && this.form.find('.ui-form-messages').length) {
                this.form.find('.ui-form-messages').html('<div class="ui-color-error">' + this.options.formErrorMessage + '</div>');
            }
        }
    }

}, {

    validate: function validate(attributes, _rules, _options) {

        var rules = _rules || {};
        var options = _options || {};
        options.triggerEvents = options.triggerEvents || false;
        var modelValidation = {};

        _.each(rules, function (keyOptions, key) {
            var validated = Model.validateAttribute(key, attributes[key], rules[key]);
            if (validated.valid == false) {
                modelValidation._isValid = false;
                modelValidation[key] = validated;
            }
            if (options.triggerEvents) {
                this.trigger('validate:' + key, validated);
            }
        }, this);

        return modelValidation;
    },

    validateAttribute: function validateAttribute(key, value, _options) {

        var options = _options || {};

        var validation = { valid: true, message: '' };

        var isEmpty = !Model.isEmpty(value).valid;

        //is email
        if (options.pattern) {
            options.patterns = [options.pattern];
        }
        if (validation.valid && options.patterns && isEmpty == false) {
            _.each(options.patterns, function (pattern) {
                if (pattern == "email") {
                    validation = Model.isEmail(value);
                    if (validation.valid == false) {
                        return false;
                    }
                }
                if (pattern == "simplestring") {
                    validation = Model.isSimpleString(value);
                    if (validation.valid == false) {
                        return false;
                    }
                }
            });
        }

        //is one of the allowed values
        if (validation.valid && options.allowedValue && isEmpty == false) {
            validation = Model.isMatch(value, options.allowedValue);
        }

        //is simple string
        if (validation.valid && options.simplestring && isEmpty == false) {
            validation = Model.isSimpleString(value);
        }

        //is empty
        if (validation.valid && options.required && isEmpty == true) {
            validation = Model.isEmpty(value);
        }

        //custom function
        if (validation.valid && options.custom) {
            var customValidation = options.custom(value);

            if (typeof customValidation != 'undefined') {
                if (customValidation === false || customValidation === true) {
                    validation = Model.returnValidation(customValidation, Model.messages.generic);
                } else {
                    validation = customValidation;
                }
            }
        }

        if (!validation.valid && typeof options.message != 'undefined') {
            validation.message = options.message;
        }

        return validation;
    },

    isEmpty: function isEmpty(value) {
        var valid = true;
        if (typeof value == "undefined" || value == null || value.trim().length == 0) {
            valid = false;
        }
        return Model.returnValidation(valid, Model.messages.isEmpty);
    },

    _isMatch: function _isMatch(value1, value2) {
        if (value1 == value2) {
            return true;
        } else {
            return false;
        }
    },

    isMatch: function isMatch(value, allowedValue) {
        var valid = false;
        if (_.isArray(allowedValue)) {
            var found = false;
            _.each(allowedValue, function (value2) {
                if (!found) {
                    found = Model._isMatch(value, value2);
                }
            });
            if (found) {
                valid = true;
            }
        } else {
            valid = Model._isMatch(value, allowedValue);
        }

        return Model.returnValidation(valid, Model.messages.isMatch);
    },

    isEmail: function isEmail(value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = re.test(value);

        return Model.returnValidation(valid, Model.messages.isEmail);
    },

    isSimpleString: function isSimpleString(value) {
        var re = /^[a-zA-Z0-9-_]+$/g;
        var valid = false;
        if (value.search(re) == -1) {
            valid = false;
        } else {
            valid = true;
        }

        return Model.returnValidation(valid, Model.messages.isSimpleString);
    },

    returnValidation: function returnValidation(isValid, message) {
        if (isValid) {
            return {
                valid: true
            };
        } else {
            return {
                valid: false,
                message: message
            };
        }
    },

    messages: {
        formErrorMessage: "There are errors in the form. Please go back and fix the highlighted fields.",
        isEmpty: "This is required.",
        isEmail: "Must be a valid email.",
        isMatch: "The value does not match allowed values.",
        generic: "This value is invalid.",
        isSimpleString: "Spaces and special characters are not allowed. Only combinations of alphanumeric characters, underscores(_), and hyphens(-) are valid."
    }

});

module.exports = Model;