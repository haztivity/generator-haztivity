/**
 * @license
 * Copyright Finsi. All Rights Reserved.
 */
import "./main.css!";
import {ScoFactory, Sco, ISco} from "@haztivity/core/index";
import {page as <%= pageName %>} from "./pages/<%= pageName %>/page";
let sco: ISco = ScoFactory.createSco(
    {
        name: "<%= scoName %>",
        pages: [
            <%= pageName %>
        ],
        components: []
    }
);
sco.run();
