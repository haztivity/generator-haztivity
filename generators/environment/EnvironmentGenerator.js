/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const BaseGenerator_1 = require("../BaseGenerator");
module.exports = class EnvironmentGenerator extends BaseGenerator_1.BaseGenerator {
    initializing() {
        this.destinationRoot("./");
        this.data = this._getData();
    }
    prompting() {
        let done = this.async();
        let prompts = [
            {
                type: 'input',
                name: 'courseName',
                message: `Let's to prepare the ${chalk.cyan("course environment")}. Please, type a name for the course. ${chalk.red("Note:")} only could contains [a-zA-Z0-9_-], for example, course_1 or my-course:`,
                default: this._S(this.appname).dasherize().s,
                validate: (toValidate) => {
                    if (this._validateNonEmpty(toValidate)) {
                        if (this._validateSpecial(toValidate)) {
                            return true;
                        }
                        else {
                            return EnvironmentGenerator.ERROR_SPECIAL_CHARACTER;
                        }
                    }
                    else {
                        return EnvironmentGenerator.ERROR_EMPTY;
                    }
                }
            },
            {
                type: 'input',
                name: 'courseDescription',
                message: `You could give some ${chalk.cyan("description")} for the course? (optional)`
            }
        ];
        this.prompt(prompts).then((answers) => {
            this.data = this._saveConfig(answers);
            done();
        });
    }
    writing() {
        this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.data);
        this.fs.copy(this.templatePath('src/_config.js'), this.destinationPath('src/config.js'));
        this.fs.copy(this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'));
        this.fs.copy(this.templatePath('./build/**'), this.destinationPath('./build'));
        this.fs.copy(this.templatePath('./src/_tsconfig.json'), this.destinationPath('./src/tsconfig.json'));
        this.fs.copyTpl(this.templatePath('./src/assets'), this.destinationPath('./src/assets'), this.data);
        this.fs.copyTpl(this.templatePath('./src/course'), this.destinationPath('./src/course'), this.data);
    }
    install() {
        this.log(`---- Installing ${chalk.cyan("NPM")} dependencies ----`);
        this.spawnCommandSync("npm", ["install"]);
        this.log(`---- ${chalk.cyan("NPM")} dependencies installed ----`);
        this.log(`---- Initializing ${chalk.cyan("JSPM")} ----`);
        this.spawnCommandSync('jspm', ['init']);
        this.log(`---- ${chalk.cyan("JSPM")} initialized ----`);
        this.log(`---- Installing ${chalk.cyan("JSPM")} dependencies ----`);
        this.spawnCommandSync('jspm', ['install']);
        this.log(`---- ${chalk.cyan("JSPM")} dependencies installed ----`);
    }
    end() {
        this._end();
        fs.unlinkSync(path.resolve(this.destinationRoot(), "src/course/__remove.txt"));
    }
};
//# sourceMappingURL=EnvironmentGenerator.js.map