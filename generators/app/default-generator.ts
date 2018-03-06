/**
 * @module generatorHaztivity.app
 *//** */
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as chalk from "chalk";
import * as yosay from "yosay";
import {BaseGenerator} from "../BaseGenerator";

/**
 * Default generator. Composed with CourseGenerator, ScoGenerator and PageGenerator
 */
export class DefaultGenerator extends BaseGenerator {
    initializing() {
        this._setOption("generatingAll", true);
        this.log(
            yosay(
                `Welcome to ${chalk.red("generator-haztivity")} generator!. I will ask you some questions to generate ${chalk.cyan(
                    "haztivity course")} ${chalk.yellow("ready to go")}. Go ahead!`
            )
        );
        this.composeWith(require.resolve("../course"), this.options);
        this.composeWith(require.resolve("../sco"), this.options);
        this.composeWith(require.resolve("../page"), this.options);
    }
}