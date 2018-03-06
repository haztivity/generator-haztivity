/**
 * @module generatorHaztivity
 */ /** */
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Generator = require("yeoman-generator");
/**
 * Base class for the generators
 */
var BaseGenerator = /** @class */ (function (_super) {
    __extends(BaseGenerator, _super);
    function BaseGenerator(args, opts) {
        return _super.call(this, args, opts) || this;
    }
    /**
     * Get all the shared options
     * @returns {{}}
     * @private
     */
    BaseGenerator.prototype._getAllOptions = function () {
        return BaseGenerator.options;
    };
    /**
     * Get a shared option
     * @param key
     * @returns {any}
     * @private
     */
    BaseGenerator.prototype._getOption = function (key) {
        return BaseGenerator.options[key];
    };
    /**
     * Set a shared option
     * @param key
     * @param value
     * @private
     */
    BaseGenerator.prototype._setOption = function (key, value) {
        BaseGenerator.options[key] = value;
    };
    /**
     * Add properties to the config. The properties will be saved in the .yo-rc file
     * @param config
     * @private
     */
    BaseGenerator.prototype._addToConfig = function (config) {
        for (var key in config) {
            this.config.set(key, config[key]);
        }
        this.config.save();
    };
    /**
     * Validate a field is not null or empty
     * @param toValidate
     * @returns {boolean}
     * @private
     */
    BaseGenerator.prototype._validateNonEmpty = function (toValidate) {
        return !!toValidate;
    };
    /**
     * Validate special characters
     * @param toValidate
     * @returns {boolean}
     * @private
     */
    BaseGenerator.prototype._validateSpecial = function (toValidate) {
        return toValidate.search(/[^\w|^-]/g) === -1;
    };
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
    return BaseGenerator;
}(Generator));
exports.BaseGenerator = BaseGenerator;
