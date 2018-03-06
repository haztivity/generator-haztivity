/**
 * @module generatorHaztivity
 */ /** */
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
/**
 * Base class for the generators
 */
class BaseGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }
    /**
     * Get all the shared options
     * @returns {{}}
     * @private
     */
    _getAllOptions() {
        return BaseGenerator.options;
    }
    /**
     * Get a shared option
     * @param key
     * @returns {any}
     * @private
     */
    _getOption(key) {
        return BaseGenerator.options[key];
    }
    /**
     * Set a shared option
     * @param key
     * @param value
     * @private
     */
    _setOption(key, value) {
        BaseGenerator.options[key] = value;
    }
    /**
     * Add properties to the config. The properties will be saved in the .yo-rc file
     * @param config
     * @private
     */
    _addToConfig(config) {
        for (let key in config) {
            this.config.set(key, config[key]);
        }
        this.config.save();
    }
    /**
     * Validate a field is not null or empty
     * @param toValidate
     * @returns {boolean}
     * @private
     */
    _validateNonEmpty(toValidate) {
        return !!toValidate;
    }
    /**
     * Validate special characters
     * @param toValidate
     * @returns {boolean}
     * @private
     */
    _validateSpecial(toValidate) {
        return toValidate.search(/[^\w|^-]/g) === -1;
    }
}
/**
 * Common message for required files
 * @type {string}
 */
BaseGenerator.ERROR_REQUIRED = "This field is required";
/**
 * Common message for special characters
 * @type {string}
 */
BaseGenerator.ERROR_SPECIAL_CHARACTER = "This field only could contains [a-zA-Z0-9_] characters, without spaces or special characters";
/**
 * Shared options for all the generators
 * @type {{}}
 */
BaseGenerator.options = {};
exports.BaseGenerator = BaseGenerator;
//# sourceMappingURL=BaseGenerator.js.map