/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
import * as Generator from "yeoman-generator";
import * as chalk from "chalk";
import * as yosay from "yosay";

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.destinationRoot('/')
    }

    initializing() {
        this.log(
            yosay(
                `Welcome to ${chalk.red('generator-haztivity')} generator!. I will ask you some questions to generate the project structure. Go ahead!`
            )
        );
    }

    protected _validateNonEmpty(toValidate) {
        return !!toValidate;
    }

    protected _validateSpecial(toValidate) {
        return toValidate.search(/\W/g) === -1;
    }

    prompting() {
        let done = this.async();
        let prompts = [
            {
                type: 'input',
                name: 'courseName',
                message: `What id would you like for the ${chalk.cyan("course")}. ${chalk.red("Note:")} only could contains [a-zA-Z0-9_], for example, course_1:`,
                default: this.appname,
                validate: (toValidate) => {
                    return this._validateNonEmpty(toValidate) && this._validateSpecial(toValidate)
                }
            },
            {
                type: 'input',
                name: 'courseDescription',
                message: `You could give some ${chalk.cyan("description")} for the course ? (optional)`
            },
            {
                type: 'input',
                name: 'scoName',
                message: `What id would you like to give to the first ${chalk.cyan("sco")}?. ${chalk.red("Note:")} only could contains [a-zA-Z0-9_], for example, sco_1:`,
                validate: (toValidate) => {
                    return this._validateNonEmpty(toValidate) && this._validateSpecial(toValidate)
                }
            },
            {
                type: 'input',
                name: 'pageName',
                message: `Nice!, the SCO should have at least one page. How I call the first ${chalk.cyan("page")}?. ${chalk.red(
                    "Note:"
                )} only could contains [a-zA-Z0-9_], for example, page1:`,
                validate: (toValidate) => {
                    return this._validateNonEmpty(toValidate) && this._validateSpecial(toValidate)
                }
            },
            {
                type: 'checkbox',
                name: 'components',
                message: 'Whould you like include some of this components?',
                choices: [
                    "HzNavbar",
                    "HzHeader"
                ]
            }
        ];
        this.prompt(prompts).then(
            (answers) => {
                this.data = answers;
                done();
            }
        );
    }

    configuring() {

    }

    default() {

    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            this.data
        );
        this.fs.copy(
            this.templatePath('_config.js'),
            this.destinationPath('config.js')
        );
        this.fs.copy(
            this.templatePath('_gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );
        this.fs.copy(
            this.templatePath('./build/**'),
            this.destinationPath('./build')
        );
        this.fs.copy(
            this.templatePath('./src/_tsconfig.json'),
            this.destinationPath('./src/tsconfig.json')
        );
        this.fs.copyTpl(
            this.templatePath('./src/assets/**'),
            this.destinationPath('./src/assets'),
            this.data
        );
        this.fs.copy(
            this.templatePath('./src/course/course/assets/**'),
            this.destinationPath(`./src/course/${this.data.scoName}/assets`)
        );
        this.fs.copyTpl(
            this.templatePath('./src/course/course/*'),
            this.destinationPath(`./src/course/${this.data.scoName}`),
            this.data
        );
        this.fs.copyTpl(
            this.templatePath('./src/course/course/pages/page/*'),
            this.destinationPath(`./src/course/${this.data.scoName}/pages/${this.data.pageName}`),
            this.data
        );
    }

    conflicts() {

    }

    install() {
        this.log(`---- Installing ${chalk.cyan("NPM")} dependencies ----`);
        this.spawnCommandSync("npm",["install"]);
        this.log(`---- ${chalk.cyan("NPM")} dependencies installed ----`);
        this.log(`---- Initializing ${chalk.cyan("JSPM")} ----`);
        this.spawnCommandSync('jspm', ['init']);
        this.log(`---- ${chalk.cyan("JSPM")} initialized ----`);
        this.log(`---- Installing ${chalk.cyan("JSPM")} dependencies ----`);
        this.spawnCommandSync('jspm', ['install']);
        this.log(`---- ${chalk.cyan("JSPM")} dependencies installed ----`);
        this.log(`---- Trying to ${chalk.cyan("build")} template ----`);
        this.spawnCommandSync('gulp', ['build']);
    }

    end() {

    }
};
