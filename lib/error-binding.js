'use strict';

var underscore = require('underscore');
var binding = require('./binding');

var ErrorBinding = function ErrorBinding(model, attribute) {

    if (process.browser !== true) {
        if (typeof model.errors != 'undefined' && typeof model.errors[attribute] != 'undefined' && typeof model.errors[attribute].message != 'undefined') {
            return model.errors[attribute].message;
        } else {
            return null;
        }
    }

    return binding(model, attribute, {
        _isErrorBinding: true,
        event: "force-validate validate:" + attribute,
        get: function get(bindingObj) {
            if (typeof bindingObj.model.errors != 'undefined' && typeof bindingObj.model.errors[attribute] != 'undefined' && typeof bindingObj.model.errors[attribute].message != 'undefined') {
                return bindingObj.model.errors[attribute].message;
            } else {
                return null;
            }
        }
    });
};
module.exports = ErrorBinding;