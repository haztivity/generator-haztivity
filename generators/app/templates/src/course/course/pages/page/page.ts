/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory, PageRegister, PageController} from "davinchi_finsi";
import * as template from "./page.tpl.html!text";
import "./page.css!";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "<%= pageName %>",
        resources: [],
        template: template
    }
);
page.on(
    PageController.ON_RENDERING, null, (eventObject, template, pageController: PageController) => {
        console.log(`${pageController.options.name} rendering`);
    }
);
page.on(
    PageController.ON_RENDERED, null, (eventObject, $page, pageController: PageController) => {
        console.log(`${pageController.options.name} rendered`);
    }
);
page.on(
    PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        console.log(`${pageController.options.name} show start`);
    }
);
page.on(
    PageController.ON_SHOWN, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        console.log(`${pageController.options.name} show end`);
    }
);
page.on(
    PageController.ON_COMPLETE_CHANGE, null, (eventObject, isCompleted, $page, pageController) => {
        console.log(`${pageController.options.name} complete change`);
    }
);
page.on(
    PageController.ON_DESTROY, null, (eventObject, $page, pageController) => {
        console.log(`${pageController.options.name} destroy`);
    }
);
