/**
 * @license
 * Copyright Finsi. All Rights Reserved.
 */
import "./main.scss";
import {ScoFactory, Sco, ISco} from "@haztivity/core";
import template from "./sco.pug";
import {HzNavbarComponent} from "@haztivity/hz-navbar";
let sco: ISco = ScoFactory.createSco(
    {
        name: "<%= scoName %>",
        template:template,
        pages: [
        ],
        components: [
            HzNavbarComponent
        ]
    }
);
sco.run();
