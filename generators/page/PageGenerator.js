/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const BaseGenerator_1 = require("../BaseGenerator");
module.exports = (_a = class PageGenerator extends BaseGenerator_1.BaseGenerator {
        initializing() {
            this.data = this._getData();
            if (this.options.full != true) {
                let dest = this.destinationRoot(), directories = this._getDirectories("src/course");
                dest = path.resolve(dest, "src/course");
                if (fs.existsSync(dest) && this.data.courseName) {
                    if (directories.length == 0) {
                        this.env.error(`${chalk.red("[Error]")} ${PageGenerator.ERROR_SCO_DOESNT_EXISTS}`);
                    }
                }
                else {
                    this.env.error(`${chalk.red("[Error]")} ${PageGenerator.ERROR_COURSE_DOESNT_EXISTS}`);
                }
            }
        }
        _getDirectories(srcpath) {
            let dirs = [];
            try {
                dirs = fs.readdirSync(srcpath)
                    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
            }
            catch (e) {
            }
            return dirs;
        }
        _validatePageExists(page) {
            return !fs.existsSync(this._resolvePageDir(page));
        }
        prompting() {
            let done = this.async(), directories = this._getDirectories("src/course");
            this.data = this._getData();
            let prompts = [
                {
                    type: 'input',
                    name: 'pageName',
                    message: `Let's to create a ${chalk.cyan("page")}. Please, type a name for the page. Must be unique. ${chalk.red("Note:")} only could contains [a-zA-Z0-9_-]:`,
                    validate: (toValidate) => {
                        if (this._validateNonEmpty(toValidate)) {
                            if (this._validateSpecial(toValidate)) {
                                if (this._validatePageExists(toValidate)) {
                                    return true;
                                }
                                else {
                                    return PageGenerator.ERROR_PAGE_EXISTS;
                                }
                            }
                            else {
                                return PageGenerator.ERROR_SPECIAL_CHARACTER;
                            }
                        }
                        else {
                            return PageGenerator.ERROR_EMPTY;
                        }
                    }
                }
            ];
            if (directories.length > 1) {
                prompts.unshift({
                    type: "list",
                    name: "scoName",
                    message: `We detected some SCO's. In which one do you like to create the page?`,
                    choices: directories
                });
            }
            this.prompt(prompts).then((answers) => {
                this.data = this._getData();
                this._extend(this.data, answers);
                done();
            });
        }
        _resolvePageDir(page) {
            return path.resolve(this.destinationRoot(), "src/course", this.data.scoName, "pages", page);
        }
        writing() {
            this.fs.copyTpl(this.templatePath('**'), this.destinationPath(this._resolvePageDir(this.data.pageName)), this.data);
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
        }
    },
    _a.ERROR_PAGE_EXISTS = "The page indicated already exists. Please, choose another name",
    _a.ERROR_COURSE_DOESNT_EXISTS = "Please, initialize a environment with 'yo haztivity:environment' before use the page generator",
    _a.ERROR_SCO_DOESNT_EXISTS = "Please, create a SCO with 'yo haztivity:sco' before use the page generator",
    _a);
var _a;
//# sourceMappingURL=PageGenerator.js.map