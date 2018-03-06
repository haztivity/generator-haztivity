/**
 * @license
 * Copyright Finsi. All Rights Reserved.
 */
import "./main.scss";
import {ScoFactory, Sco, ISco} from "@haztivity/core";
import template from "./sco.pug";
import {HzNavbarComponent} from "@haztivity/hz-navbar";
//hz-generator:imports - Leave this comment for auto imports when using generators
let sco: ISco = ScoFactory.createSco(
    {
        name: "<%= scoName %>",
        template:template,
        pages: [
            //hz-generator:pages - Leave this comment for auto add pages created with generators
        ],
        components: [
            HzNavbarComponent
        ]
    }
);
sco.run();
