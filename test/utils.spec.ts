import { assert } from "chai";
import { normalise, cloneWith, getMethods } from "../src/utils";

describe("Utility functions", function () {
    describe("normalise(...)", function () {
        it("returns 0 for missing values", function () {
            const values = normalise({});

            assert.deepEqual(values, {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });

        it("values are maintained", function () {
            const values = normalise({
                years: 1,
                months: 7,
                days: 11,
                hours: 3,
                minutes: 52,
                seconds: 48
            });

            assert.deepEqual(values, {
                years: 1,
                months: 7,
                days: 11,
                hours: 3,
                minutes: 52,
                seconds: 48
            });
        });

        it("merges positive values", function () {
            const values = normalise({ months: 7, hours: 3, minutes: 52 });

            assert.deepEqual(values, {
                years: 0,
                months: 7,
                days: 0,
                hours: 3,
                minutes: 52,
                seconds: 0
            });
        });

        it("merges negative values", function () {
            const values = normalise({ years: -1, days: -11, seconds: -48 });

            assert.deepEqual(values, {
                years: -1,
                months: 0,
                days: -11,
                hours: 0,
                minutes: 0,
                seconds: -48
            });
        });
    });

    describe("cloneWith(...)", function () {
        it("returns a new date instance", function () {
            const today = new Date();
            const cloned = cloneWith(today, {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });

            assert.notStrictEqual(today, cloned);
        });

        it("applies changes to new instance", function () {
            const y2k = new Date(2000, 0, 1, 0, 0, 0);
            const changed = cloneWith(y2k, {
                years: 10,
                months: 6,
                days: 7,
                hours: 12,
                minutes: 30,
                seconds: 15
            });

            assert.strictEqual(2010, changed.getFullYear(), "Incorrect year applied");
            assert.strictEqual(6, changed.getMonth(), "Incorrect month applied");
            assert.strictEqual(8, changed.getDate(), "Incorrect day applied");
            assert.strictEqual(12, changed.getHours(), "Incorrect hours applied");
            assert.strictEqual(30, changed.getMinutes(), "Incorrect minutes applied");
            assert.strictEqual(15, changed.getSeconds(), "Incorrect seconds applied");
        });
    });

    describe("getMethods(...)", function () {
        const exampleObject = {
            length: 12,
            name: "ExampleObject",
            get type() { return "Example"; },
            getName() { return this.name; },
            someMethod() { return; }
        };

        it("returns an array of name-value pairs", function () {
            const methods = getMethods(exampleObject);

            assert.isArray(methods);
            assert.isAtLeast(methods.length, 1);
            assert.isArray(methods[0]);
        });

        it("returns only functions", function () {
            const methods = getMethods(exampleObject);

            methods.forEach(([name, value]) => {
                assert.isString(name);
                assert.property(exampleObject, name);
                assert.isFunction(value);
            });
        });

        it("doesn't traverse prototype", function () {
            const methods = getMethods(exampleObject);
            const methodNames = methods.map(([name]) => name);

            // Only expect own properties, not those in prototype chain
            assert.strictEqual(2, methods.length);
            assert.hasAllKeys(methodNames, ["getName", "someMethod"]);
        });
    });
});
