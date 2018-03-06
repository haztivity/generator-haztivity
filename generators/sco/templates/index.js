"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Finsi. All Rights Reserved.
 */
require("./main.scss");
const core_1 = require("@haztivity/core");
const sco_pug_1 = require("./sco.pug");
const hz_navbar_1 = require("@haztivity/hz-navbar");
let sco = core_1.ScoFactory.createSco({
    name: "<%= scoName %>",
    template: sco_pug_1.default,
    pages: [],
    components: [
        hz_navbar_1.HzNavbarComponent
    ]
});
sco.run();
//# sourceMappingURL=index.js.map