"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module generatorHaztivity.app
 */ /** */
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
const chalk = require("chalk");
const yosay = require("yosay");
const BaseGenerator_1 = require("../BaseGenerator");
/**
 * Default generator. Composed with CourseGenerator, ScoGenerator and PageGenerator
 */
class DefaultGenerator extends BaseGenerator_1.BaseGenerator {
    initializing() {
        this._setOption("generatingAll", true);
        this.log(yosay(`Welcome to ${chalk.red("generator-haztivity")} generator!. I will ask you some questions to generate ${chalk.cyan("haztivity course")} ${chalk.yellow("ready to go")}. Go ahead!`));
        this.composeWith(require.resolve("../course"), this.options);
        this.composeWith(require.resolve("../sco"), this.options);
        this.composeWith(require.resolve("../page"), this.options);
    }
}
exports.DefaultGenerator = DefaultGenerator;
//# sourceMappingURL=default-generator.js.map