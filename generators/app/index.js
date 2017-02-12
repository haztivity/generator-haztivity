/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
module.exports = class extends Generator {
    initializing() {
        this.options.full = true;
        this.log(yosay(`Welcome to ${chalk.red('generator-haztivity')} generator!. I will ask you some questions to generate the ${chalk.cyan("project structure")}. Go ahead!`));
        this.composeWith(require.resolve('../environment/EnvironmentGenerator'), this.options);
        this.composeWith(require.resolve('../sco/ScoGenerator'), this.options);
        this.composeWith(require.resolve('../page/PageGenerator'), this.options);
    }
    configuring() {
    }
    default() {
    }
    conflicts() {
    }
    end() {
    }
};
//# sourceMappingURL=index.js.map