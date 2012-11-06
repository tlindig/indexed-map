var chai = require('chai');

// By default, Chai does not show stack traces upon an AssertionError.
// This can be changed by modifying the includeStack parameter for chai.Assertion.
//chai.Assertion.includeStack = true; // defaults to false

//make "expect" syntax available for test files
global.expect = chai.expect;

