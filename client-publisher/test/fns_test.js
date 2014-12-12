var assert = require('assert')
var fns = require("../src/fns");

describe("fns", function() {
    describe(".scrs", function() {
        it("should only save base64 if present", function() {
            var node = null;
            var event = null;
            var result = fns.scrs(event, node);
            assert('' === result);
        });
    });
});