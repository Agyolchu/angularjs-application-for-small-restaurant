/**
 * Created by agilyolchuyev on 15/03/2017.
 */
exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        'e2e/*.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:3001/',

    framework: 'jasmine',
     directConnect: true,

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }



};