/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as template from "./page.pug";
import "./page.scss";
import {PageFactory, PageRegister, PageController} from "@haztivity/core";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "<%= pageName %>",
        resources: [],
        template: template
    }
);
page.on(PageController.ON_RENDERING,null,(eventObject,template,pageController)=>{
    console.log(`${pageController.options.name} rendering`);
});
page.on(PageController.ON_RENDERED,null,(eventObject,$page:JQuery,pageController:PageController)=>{
    console.log(`${pageController.options.name} rendered`);
});
page.on(PageController.ON_SHOW,null,(eventObject,$page,$oldPage,oldPageRelativePosition,pageController)=>{
    console.log(`${pageController.options.name} show start`);
});
page.on(PageController.ON_SHOWN,null,(eventObject,$page,$oldPage,oldPageRelativePosition,pageController)=>{
    console.log(`${pageController.options.name} show end`);
});
page.on(PageController.ON_RESOURCE_COMPLETED,null,(eventObject,$page,pageController,resource)=>{
    console.log(`${pageController.options.name} resource completed`);
});
page.on(PageController.ON_COMPLETE_CHANGE,null,(eventObject,isCompleted,$page,pageController)=>{
    console.log(`${pageController.options.name} complete change`);
});
page.on(PageController.ON_DESTROY,null,(eventObject,$page,pageController)=>{
    console.log(`${pageController.options.name} destroy`);
});
