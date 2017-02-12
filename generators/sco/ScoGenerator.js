/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const BaseGenerator_1 = require("../BaseGenerator");
module.exports = (_a = class ScoGenerator extends BaseGenerator_1.BaseGenerator {
        initializing() {
            let dest = this.destinationRoot();
            dest = path.resolve(dest, "src/course");
            this.data = this._getData();
            if (this.options.full != true) {
                if (!fs.existsSync(dest) || !this.data.courseName) {
                    this.env.error(`${chalk.red("[Error]")} ${ScoGenerator.ERROR_COURSE_FOLDER_DOESNT_EXISTS}`);
                }
            }
        }
        _validateScoExists(id) {
            let dest = this.destinationRoot();
            return !fs.existsSync(path.join(dest, id));
        }
        prompting() {
            let done = this.async();
            this.data = this._getData();
            let prompts = [
                {
                    type: 'input',
                    name: 'scoName',
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
                            return ScoGenerator.ERROR_EMPTY;
                        }
                    }
                }
            ];
            this.prompt(prompts).then((answers) => {
                this.data = this._saveConfig(answers);
                done();
            });
        }
        writing() {
            this.fs.copyTpl(this.templatePath('**'), this.destinationPath(path.resolve(this.destinationRoot(), "src/course", this.data.scoName)), this.data);
        }
        install() {
            //this.log(`---- Installing ${chalk.cyan("NPM")} dependencies ----`);
            //this.spawnCommandSync("npm",["install"]);
            //this.log(`---- ${chalk.cyan("NPM")} dependencies installed ----`);
            //this.log(`---- Initializing ${chalk.cyan("JSPM")} ----`);
            //this.spawnCommandSync('jspm', ['init']);
            //this.log(`---- ${chalk.cyan("JSPM")} initialized ----`);
            //this.log(`---- Installing ${chalk.cyan("JSPM")} dependencies ----`);
            //this.spawnCommandSync('jspm', ['install']);
            //this.log(`---- ${chalk.cyan("JSPM")} dependencies installed ----`);
        }
        end() {
            this._end();
            fs.unlinkSync(path.resolve(this.destinationRoot(), "src/course", this.data.scoName, "pages/__remove.txt"));
        }
    },
    _a.ERROR_SCO_EXISTS = "The SCO indicated already exists. Please, choose another name",
    _a.ERROR_COURSE_FOLDER_DOESNT_EXISTS = "Please, initialize a environment with 'yo haztivity:environment' before use the sco generator",
    _a);
var _a;
//# sourceMappingURL=ScoGenerator.js.map