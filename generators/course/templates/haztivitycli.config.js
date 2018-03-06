"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    homeDir: "./course",
    scoTest: /sco*/,
    dev: {
        server: {
            root: ".",
            port: 4444,
            hmr: true
        },
        fusebox: {
            cache: false,
            log: true,
            debug: true,
            shim: {
                jquery: {
                    source: "node_modules/jquery/dist/jquery.js",
                    exports: "$",
                }
            }
        }
    },
    dist:{
        fusebox:{
            cache:false,
            log:true,
            debug:true,
            shim: {
                jquery: {
                    source: "node_modules/jquery/dist/jquery.js",
                    exports: "$"
                }
            }
        },
        copy:[
            "{{homeDir}}/**/*.{ttf,otf,woff,woff2,eot}",
            "{{homeDir}}/**/*.{gif,jpg,png,svg}",
            "{{homeDir}}/**/index.html",
            "{{homeDir}}/**/*.{pdf,doc,docx,xls,xlsx,ppt,pptx}"
        ]
    }
};
