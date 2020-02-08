"use strict";
exports.__esModule = true;
var ErrorMapper_1 = require("utils/ErrorMapper");
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
exports.loop = ErrorMapper_1.ErrorMapper.wrapLoop(function () {
    console.log("Current game tick is " + Game.time);
    // Automatically delete memory of missing creeps
    for (var name_1 in Memory.creeps) {
        if (!(name_1 in Game.creeps)) {
            delete Memory.creeps[name_1];
        }
    }
});
