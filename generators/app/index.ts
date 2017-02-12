/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
'use strict';
import * as Generator from "yeoman-generator";
import * as chalk from "chalk";
import * as yosay from "yosay";
module.exports = class extends Generator {
    initializing() {
        this.options.full = true;
        this.log(
            yosay(
                `Welcome to ${chalk.red('generator-haztivity')} generator!. I will ask you some questions to generate the ${chalk.cyan("project structure")}. Go ahead!`
            )
        );
        this.composeWith(require.resolve('../environment/EnvironmentGenerator'),this.options);
        this.composeWith(require.resolve('../sco/ScoGenerator'),this.options);
        this.composeWith(require.resolve('../page/PageGenerator'),this.options);
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
