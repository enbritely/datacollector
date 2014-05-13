var assert = require('assert')
var util = require("../src/util");

describe("util", function() {
   describe(".buildQuery", function() {
       it("should build an url without params", function(){
           var query = util.buildQuery('http://localhost:8000', '/api/test');
           assert('http://localhost:8000/api/test' === query);
       });
   });
});

describe("util", function() {
   describe(".buildQuery", function() {
       it("should build an url with params", function(){
           var query = util.buildQuery('http://localhost:8000', '/api/test', {test: 'test', test2: 'param2'});
           assert('http://localhost:8000/api/test?test=test&test2=param2' === query);
       });
   });
});

describe("util", function() {
   describe(".buildQuery", function() {
       it("should build an url with three params", function(){
           var query = util.buildQuery('http://localhost:8000', '/api/test', {test: 'test', test2: 'param2', hgs: 'hga'});
           assert('http://localhost:8000/api/test?test=test&test2=param2&hgs=hga' === query);
       });
   });
});

describe("util", function() {
   describe(".hash", function() {
       it("should build a nonnull hash", function(){
           var hash = util.hash('6p3valv1cqjitup47uqu4noif1');
           assert(hash.length != 0);
           assert(hash > 0);
       });
   });
});