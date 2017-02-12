/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
const fs = require("fs");
const Generator = require("yeoman-generator");
const S = require("string");
const extend = require("extend");
class BaseGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this._S = S;
        this._extend = extend;
    }
    _saveConfig(data) {
        let storedData = this._getData() || {};
        storedData = this._extend(true, {}, storedData, data);
        for (let key in data) {
            this._setData(key, data[key]);
        }
        return storedData;
    }
    _getData() {
        if (this._checkYeomanConfig()) {
            return this.config.getAll();
        }
        else {
            return this._getTempData();
        }
    }
    _checkYeomanConfig() {
        if (this._yeomanConfigExists == undefined) {
            this._yeomanConfigExists = Object.keys(this.config.getAll()).length !== 0;
        }
        return this._yeomanConfigExists;
    }
    _setData(key, value) {
        this.config.set(key, value);
        if (!this._checkYeomanConfig()) {
            let data = this._getData();
            data[key] = value;
            this._writeTemp(data);
        }
    }
    _getTempData() {
        let content = {};
        try {
            content = JSON.parse(fs.readFileSync(".hztemp", { encoding: "utf8" }));
        }
        catch (e) {
        }
        return content;
    }
    _writeTemp(file) {
        file = JSON.stringify(file, null, 4);
        fs.writeFileSync(".hztemp", file);
    }
    _validateNonEmpty(toValidate) {
        return !!toValidate;
    }
    _validateSpecial(toValidate) {
        return toValidate.search(/[^\w|^-]/g) === -1;
    }
    _end() {
        try {
            fs.unlinkSync("./hztemp");
        }
        catch (e) {
        }
    }
}
BaseGenerator.ERROR_EMPTY = "This field is required";
BaseGenerator.ERROR_SPECIAL_CHARACTER = "This field only could contains [a-zA-Z0-9_] characters, without spaces or special characters";
exports.BaseGenerator = BaseGenerator;
//# sourceMappingURL=BaseGenerator.js.map