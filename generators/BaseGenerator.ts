/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
import * as fs from "fs";
import * as Generator from "yeoman-generator";
import * as S from "string";
import * as extend from "extend";
export class BaseGenerator extends Generator {
    protected static readonly ERROR_EMPTY = "This field is required";
    protected static readonly ERROR_SPECIAL_CHARACTER="This field only could contains [a-zA-Z0-9_] characters, without spaces or special characters";
    protected _yeomanConfigExists;
    constructor(args, opts) {
        super(args, opts);
        this._S = S;
        this._extend = extend;
    }
    protected _saveConfig(data){
        let storedData = this._getData() ||{};
        storedData = this._extend(true,{},storedData,data);
        for(let key in data){
            this._setData(key,data[key]);
        }
        return storedData;
    }
    protected _getData(){
        if(this._checkYeomanConfig()){
            return this.config.getAll();
        }else{
            return this._getTempData();
        }
    }
    protected _checkYeomanConfig(){
        if(this._yeomanConfigExists == undefined){
            this._yeomanConfigExists = Object.keys(this.config.getAll()).length !== 0;
        }
        return this._yeomanConfigExists;

    }
    protected _setData(key,value){
        this.config.set(key,value);
        if(!this._checkYeomanConfig()){
            let data = this._getData();
            data[key] = value;
            this._writeTemp(data);
        }
    }
    protected _getTempData(){
        let content = {};
        try {
            content = JSON.parse(fs.readFileSync(".hztemp", {encoding:"utf8"}));
        }catch(e){

        }
        return content;
    }
    protected _writeTemp(file){
        file = JSON.stringify(file,null,4);
        fs.writeFileSync(".hztemp",file);
    }
    protected _validateNonEmpty(toValidate) {
        return !!toValidate;
    }

    protected _validateSpecial(toValidate) {
        return toValidate.search(/[^\w|^-]/g) === -1;
    }
    _end(){
        try {
            fs.unlinkSync("./hztemp");
        }catch(e){

        }
    }
}