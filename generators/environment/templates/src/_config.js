System.config({
    baseURL: "/src",
    defaultJSExtensions: true,
    transpiler: "typescript",
    paths: {
        "github:*": "jspm_packages/github/*",
        "npm:*": "jspm_packages/npm/*"
    }
});
