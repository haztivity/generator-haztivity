/**
 * @license
 * Copyright Finsi. All Rights Reserved.
 */
import "./main.css!";
import {ScoFactory, Sco, ISco} from "@haztivity/core/index";
let sco: ISco = ScoFactory.createSco(
    {
        name: "<%= scoName %>",
        pages: [
        ],
        components: []
    }
);
sco.run();
