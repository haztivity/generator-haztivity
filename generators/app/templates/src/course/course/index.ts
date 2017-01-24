/**
 * @license
 * Copyright Finsi. All Rights Reserved.
 */
import "./main.css!";
import {ScoFactory, Sco, ISco} from "davinchi_finsi";
import {page as
< %= pageName % >
}
from
"./pages/<%= pageName %>/page";
let sco: ISco = ScoFactory.createSco(
    {
        name: "<%= scoName %>",
        pages: [
            < %= pageName % >
        ],
        components: []
    }
);
sco.run();
