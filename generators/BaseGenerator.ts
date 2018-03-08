/**
 * @module generatorHaztivity
 *//** */
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
import * as Generator from "yeoman-generator";
/**
 * Base class for the generators
 */
export abstract class BaseGenerator extends Generator {
  /**
   * Common message for required files
   * @type {string}
   */
  protected static readonly ERROR_REQUIRED = "This field is required";
  /**
   * Common message for special characters
   * @type {string}
   */
    protected static readonly ERROR_SPECIAL_CHARACTER="This field only could contains [a-zA-Z0-9_] characters, without spaces or special characters";
  /**
   * Shared options for all the generators
   * @type {{}}
   */
  protected static options = {};
    constructor(args, opts) {
        super(args, opts);
    }

  /**
   * Get all the shared options
   * @returns {{}}
   * @private
   */
    protected _getAllOptions(){
        return BaseGenerator.options;
    }

  /**
   * Get a shared option
   * @param key
   * @returns {any}
   * @private
   */
    protected _getOption(key){
        return BaseGenerator.options[key];
    }

  /**
   * Set a shared option
   * @param key
   * @param value
   * @private
   */
    protected _setOption(key,value){
        BaseGenerator.options[key]=value;
    }

  /**
   * Add properties to the config. The properties will be saved in the .yo-rc file
   * @param config
   * @private
   */
    protected _addToConfig(config){
      for(let key in config){
        this.config.set(key,config[key]);
      }
      this.config.save();
    }

  /**
   * Validate a field is not null or empty
   * @param toValidate
   * @returns {boolean}
   * @private
   */
    protected _validateNonEmpty(toValidate) {
        return !!toValidate;
    }

  /**
   * Validate special characters
   * @param toValidate
   * @returns {boolean}
   * @private
   */
    protected _validateSpecial(toValidate) {
        return toValidate.search(/[^\w|^-]/g) === -1;
    }
}
