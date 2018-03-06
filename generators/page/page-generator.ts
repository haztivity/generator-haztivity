/**
 * @module generatorHaztivity.page
 *//** */
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as fs from "fs";
import * as chalk from "chalk";
import * as path from "path";
import {BaseGenerator} from "../BaseGenerator";
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
        this.env.error(<any>"[Error] Error reading directories: "+e.message);
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
    debugger;
    return !fs.existsSync(this.destinationPath("course", this.config.get("scoName"),"pages",page));
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
        message: `We detected different SCO's. In which one do you like to create the page?`,
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
    debugger;
    this.fs.copyTpl(
      this.templatePath("**"),
      this.destinationPath("course", config.scoName,"pages",config.pageName),
      config
    );
  }

  install() {
    if (!this._getOption("generatingAll")) {
      this.log(`---- Installing ${chalk.cyan("NPM")} dependencies ----`);
      this.spawnCommandSync("npm", ["install"]);
      this.log(`---- ${chalk.cyan("NPM")} dependencies installed ----`);
    }
  }
}
