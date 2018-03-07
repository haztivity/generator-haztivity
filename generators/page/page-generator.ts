/**
 * @module generatorHaztivity.page
 */
/** */
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as fs from "fs-extra";
import * as chalk from "chalk";
import * as path from "path";
import {BaseGenerator} from "../BaseGenerator";
import * as esprima from "esprima";
import * as yosay from "yosay";

/**
 * Generator for pages
 */
export class PageGenerator extends BaseGenerator {
    /**
     * Error for existing page
     * @type {string}
     */
    protected static readonly ERROR_PAGE_EXISTS = "The page indicated already exists. Please, choose another name";
    /**
     * Error for non existing course
     * @type {string}
     */
    protected static readonly ERROR_COURSE_DOESNT_EXISTS = "Before creating a page is necessary create a course and sco. Please use 'yo haztivity'";
    /**
     * Error for non existing sco
     * @type {string}
     */
    protected static readonly ERROR_SCO_DOESNT_EXISTS = "Before creating a page is necessary create a sco. Please use 'yo haztivity:sco'";

    initializing() {
        //if the generator is invoked without ScoGenerator, check if already exists the required structure
        if (!this._getOption("generatingAll")) {
            this.log(
                yosay(
                    `Welcome to ${chalk.red("generator-haztivity")} generator!. I will ask you some questions to generate the structure of an ${chalk.cyan(
                        "haztivity page")}. Go ahead!`
                )
            );
            const coursesPath = this.destinationPath("course"),
                courseName = this.config.get("courseName");
            if (fs.existsSync(coursesPath) && courseName) {
                const directories = this._getDirectories(coursesPath);
                if (directories.length == 0) {
                    this.env.error(<any>`${chalk.red("[Error]")} ${PageGenerator.ERROR_SCO_DOESNT_EXISTS}`);
                }
            } else {
                this.env.error(<any>`${chalk.red("[Error]")} ${PageGenerator.ERROR_COURSE_DOESNT_EXISTS}`);
            }
        }
    }

    /**
     * Get an array of directories in a path
     * @param srcpath
     * @returns {string[]}
     * @private
     */
    _getDirectories(srcpath): string[] {
        let dirs = [];
        try {
            dirs = fs.readdirSync(srcpath)
                .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
        } catch (e) {
            this.env.error(<any>"[Error] Error reading directories: " + e.message);
        }
        return dirs;
    }

    /**
     * Validate if a file page exists
     * @param page
     * @returns {boolean}
     * @private
     */
    _validatePageExists(page) {
        return !fs.existsSync(this.destinationPath("course", this.config.get("scoName"), "pages", page));
    }

    _addPageToSco() {
        const scoTsPath = this.destinationPath("course", this.config.get("scoName"), "index.ts"),
            pageName = this.config.get("pageName");
        try {
            let scoContent = fs.readFileSync(scoTsPath, {encoding: "utf-8"});
            if (scoContent) {
                //look for marks
                let importMark = scoContent.search(/\/\/hz-generator:imports[^\n]+/),
                    pageMark = scoContent.search(/\/\/hz-generator:pages[^\n]+/);
                //check if the import mark exists
                if (importMark != -1) {
                    //check if the page mark exists
                    if (pageMark != -1) {
                        const pageToAdd = `page${pageName}`,
                            importToAdd = `import {page as ${pageToAdd}} from "./pages/${pageName}/page";`;
                        //add te import
                        scoContent = scoContent.substring(0, importMark) + importToAdd + "\n" + scoContent.substring(
                            importMark);
                        //find the page mark again
                        pageMark = scoContent.search(/\/\/hz-generator:pages[^\n]+/);
                        //add the mark
                        scoContent = scoContent.substring(0, pageMark) + pageToAdd + "\n" + scoContent.substring(
                            pageMark);
                        //check if is necessary add a "," in the previous token
                        const tokens = esprima.tokenize(scoContent, {range: true}),
                            //look for the new page
                            addedPageToken = tokens.filter((def) => def.value == pageToAdd)[1],
                            previousToken = tokens[tokens.indexOf(addedPageToken) - 1];
                        //check if the previous token is Punctuator
                        if (previousToken.type != "Punctuator") {
                            //add the ","
                            scoContent = scoContent.substring(0, previousToken.range[1]) + "," + scoContent.substring(
                                previousToken.range[1]);
                        }
                        //update the file
                        try {
                            fs.writeFileSync(scoTsPath, scoContent);
                        } catch (e) {
                            this.log(`${chalk.red("[Error]")}Failing to add automatically the new page '${this.config.get(
                                "pageName")}' to the selected sco in '${scoTsPath}': ${e.message}`);
                        }
                    } else {
                        this.log(`${chalk.yellow("[WARN]")} The created page ${chalk.cyan(pageName)} couldn't be added to the sco ${chalk.cyan(
                            scoTsPath)}. Please, add the next line to the sco ts file inside the pages array: ${chalk.cyan(
                            "//hz-generator:pages - Leave this comment to auto add pages when using generators")}. For more info please go to https://goo.gl/3mM3Pv`);
                    }
                } else {
                    this.log(`${chalk.yellow("[WARN]")} The created page ${chalk.cyan(pageName)} couldn't be added to the sco ${chalk.cyan(
                        scoTsPath)}. Please, add the next line to the sco ts file where you place the imports: ${chalk.cyan(
                        "//hz-generator:imports - Leave this comment to auto add imports when using generators")}. For more info please go to https://goo.gl/3mM3Pv`);
                }
                //look for the starting array "["
                //look for the next end of array "]"
            } else {
                this.log(`${chalk.red("[Error]")} Failing to add automatically the new page '${this.config.get("pageName")}' to the selected sco in '${scoTsPath}'. The 'index.ts' file of the sco couldn't be found`);
            }
        } catch (e) {
            this.log(`${chalk.red("[Error]")} Failing to add automatically the new page '${this.config.get("pageName")}' to the selected sco in '${scoTsPath}': ${e.message}`);
        }
    }

    prompting() {
        let done = this.async(),
            directories = [];
        if (!this._getOption("generatingAll")) {
            directories = this._getDirectories("course");
        }
        let prompts = [
            {
                type: "input",
                name: "pageName",
                message: `Let's to create a ${chalk.cyan("page")}. Please, type a name for the page. Must be unique. ${chalk.red(
                    "Note:")} only could contains [a-zA-Z0-9_-]:`,
                validate: (toValidate) => {
                    if (this._validateNonEmpty(toValidate)) {
                        if (this._validateSpecial(toValidate)) {
                            if (this._validatePageExists(toValidate)) {
                                return true;
                            } else {
                                return PageGenerator.ERROR_PAGE_EXISTS;
                            }
                        } else {
                            return PageGenerator.ERROR_SPECIAL_CHARACTER;
                        }
                    } else {
                        return PageGenerator.ERROR_REQUIRED;
                    }
                }
            }
        ];
        if (directories.length > 1) {
            prompts.unshift({
                type: "list",
                name: "scoName",
                message: `We detected multiple folders in the SCO's directory. In which folder would you like to create the page?`,
                choices: directories
            });
        }
        this.prompt(prompts).then(
            (answers) => {
                this._addToConfig(answers);
                done();
            }
        );
    }

    writing() {
        const config = this.config.getAll();
        this.fs.copyTpl(
            this.templatePath("**"),
            this.destinationPath("course", config.scoName, "pages", config.pageName),
            config
        );
    }
    install() {
        this._addPageToSco();
        if (!this._getOption("generatingAll")) {
            this.log(`---- Installing ${chalk.cyan("NPM")} dependencies ----`);
            this.spawnCommandSync("npm", ["install"]);
            this.log(`---- ${chalk.cyan("NPM")} dependencies installed ----`);
        }
    }
}
