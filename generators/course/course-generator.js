/**
 * @module generatorHaztivity.course
 */ /** */
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const S = require("string");
const BaseGenerator_1 = require("../BaseGenerator");
const yosay = require("yosay");
/**
 * Course generator
 */
class CourseGenerator extends BaseGenerator_1.BaseGenerator {
    initializing() {
        if (!this._getOption("generatingAll")) {
            this.log(yosay(`Welcome to ${chalk.red("generator-haztivity")} generator!. I will ask you some questions to generate the structure of an ${chalk.cyan("haztivity course")}. Go ahead!`));
        }
    }
    prompting() {
        let done = this.async();
        let prompts = [
            {
                type: "input",
                name: "courseName",
                message: `Let's to prepare the ${chalk.cyan("course environment")}. Please, type a name for the course. ${chalk.red("Note:")} only could contains [a-zA-Z0-9_-], for example, course_1 or my-course:`,
                default: S(this.appname).dasherize().s,
                validate: (toValidate) => {
                    if (this._validateNonEmpty(toValidate)) {
                        if (this._validateSpecial(toValidate)) {
                            return true;
                        }
                        else {
                            return CourseGenerator.ERROR_SPECIAL_CHARACTER;
                        }
                    }
                    else {
                        return CourseGenerator.ERROR_REQUIRED;
                    }
                }
            },
            {
                type: "input",
                name: "courseDescription",
                message: `You could give some ${chalk.cyan("description")} for the course? (optional)`
            },
            {
                type: "input",
                name: "courseAuthor",
                message: `Who is the ${chalk.cyan("author")} of the course? (optional)`
            }
        ];
        this.prompt(prompts).then((answers) => {
            this._addToConfig(answers);
            done();
        });
    }
    writing() {
        const config = this.config.getAll();
        this.fs.copyTpl(this.templatePath("**"), this.destinationPath("./"), config);
        /*this.fs.copyTpl(
            this.templatePath('./src/course'),
            this.destinationPath('./src/course'),
            this.data
        );*/
    }
    install() {
        this.log(`---- Installing ${chalk.cyan("NPM")} dependencies ----`);
        this.spawnCommandSync("npm", ["install"]);
        this.log(`---- ${chalk.cyan("NPM")} dependencies installed ----`);
    }
}
exports.CourseGenerator = CourseGenerator;
//# sourceMappingURL=course-generator.js.map