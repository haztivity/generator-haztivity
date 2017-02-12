"use strict";
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
const davinchi_finsi_1 = require("davinchi_finsi");
const template = require("./page.tpl.html!text");
require("./page.css!");
exports.page = davinchi_finsi_1.PageFactory.createPage({
    name: "<%= pageName %>",
    resources: [],
    template: template
});
exports.page.on(davinchi_finsi_1.PageController.ON_RENDERING, null, (eventObject, template, pageController) => {
    console.log(`${pageController.options.name} rendering`);
});
exports.page.on(davinchi_finsi_1.PageController.ON_RENDERED, null, (eventObject, $page, pageController) => {
    console.log(`${pageController.options.name} rendered`);
});
exports.page.on(davinchi_finsi_1.PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
    console.log(`${pageController.options.name} show start`);
});
exports.page.on(davinchi_finsi_1.PageController.ON_SHOWN, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
    console.log(`${pageController.options.name} show end`);
});
exports.page.on(davinchi_finsi_1.PageController.ON_COMPLETE_CHANGE, null, (eventObject, isCompleted, $page, pageController) => {
    console.log(`${pageController.options.name} complete change`);
});
exports.page.on(davinchi_finsi_1.PageController.ON_DESTROY, null, (eventObject, $page, pageController) => {
    console.log(`${pageController.options.name} destroy`);
});
//# sourceMappingURL=page.js.map