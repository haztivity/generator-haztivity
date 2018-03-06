/**
 * @module generatorHaztivity.sco
 */ /** */
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const BaseGenerator_1 = require("../BaseGenerator");
const yosay = require("yosay");
/**
 * Generator for scos
 */
class ScoGenerator extends BaseGenerator_1.BaseGenerator {
    initialize() {
        //if the generator is invoked without CourseGenerator, check if already exists the required structure
        if (!this._getOption("generatingAll")) {
            this.log(yosay(`Welcome to ${chalk.red("generator-haztivity")} generator!. I will ask you some questions to generate the structure of an ${chalk.cyan("haztivity sco")}. Go ahead!`));
            //check if the course exists
            const coursesPath = this.destinationPath("course"), courseName = this.config.get("courseName");
            if (!fs.existsSync(coursesPath) || !courseName) {
                this.env.error(`${chalk.red("[Error]")} ${ScoGenerator.ERROR_COURSE_FOLDER_DOESNT_EXISTS}`);
            }
        }
    }
    /**
     * Verify the existence of a sco folder
     * @param id
     * @returns {boolean}
     * @private
     */
    _validateScoExists(id) {
        let dest = this.destinationRoot();
        return !fs.existsSync(path.join(dest, id));
    }
    prompting() {
        let done = this.async();
        let prompts = [
            {
                type: "input",
                name: "scoName",
                message: `Let's to create a ${chalk.cyan("SCO")}. Please, type a name for the SCO. Must be unique. ${chalk.red("Note:")} only could contains [a-zA-Z0-9_-]:`,
                validate: (toValidate) => {
                    if (this._validateNonEmpty(toValidate)) {
                        if (this._validateSpecial(toValidate)) {
                            if (this._validateScoExists(toValidate)) {
                                return true;
                            }
                            else {
                                return ScoGenerator.ERROR_SCO_EXISTS;
                            }
                        }
                        else {
                            return ScoGenerator.ERROR_SPECIAL_CHARACTER;
                        }
                    }
                    else {
                        return ScoGenerator.ERROR_REQUIRED;
                    }
                }
            }
        ];
        this.prompt(prompts).then((answers) => {
            this._addToConfig(answers);
            done();
        });
    }
    writing() {
        const config = this.config.getAll();
        this.fs.copyTpl(this.templatePath("**"), this.destinationPath("course", config.scoName), config);
    }
}
/**
 * Error message for existing sco
 * @type {string}
 */
ScoGenerator.ERROR_SCO_EXISTS = "The SCO indicated already exists. Please, choose another name";
/**
 * Error message for course required
 * @type {string}
 */
ScoGenerator.ERROR_COURSE_FOLDER_DOESNT_EXISTS = "Please, initialize an course with 'yo haztivity' before use the sco generator";
exports.ScoGenerator = ScoGenerator;
//# sourceMappingURL=sco-generator.js.map