import { assert } from "chai";
import { Epochee } from "../src/epochee";

describe("Epochee", function () {
    describe("new Epochee(...)", function () {
        it("keeps date immutable", function () {
            const now = new Date();
            const instance = new Epochee(now);

            assert.notStrictEqual(instance.date, now);
        });

        it("maintains correct date values", function () {
            const now = new Date();
            const copy = (new Epochee(now)).date;

            assert.strictEqual(now.getFullYear(), copy.getFullYear());
            assert.strictEqual(now.getMonth(), copy.getMonth());
            assert.strictEqual(now.getDate(), copy.getDate());
            assert.strictEqual(now.getHours(), copy.getHours());
            assert.strictEqual(now.getMinutes(), copy.getMinutes());
            assert.strictEqual(now.getSeconds(), copy.getSeconds());
        });
    });

    describe("can call Epochee.extend(...)", function () {
        it("will call plugin install method", function () {
            let called = false;

            Epochee.extend({
                name: "",
                install: () => {
                    called = true;
                }
            });

            assert.isTrue(called);
        });

        it("will pass prototype to install method", function () {
            Epochee.extend({
                name: "",
                install: (prototype) => {
                    assert.strictEqual(prototype, Epochee.prototype);
                }
            });
        });

        it("throws when plugin redefines core method", function () {
            let original_method = Epochee.prototype.add;

            assert.throw(function () {
                Epochee.extend({
                    name: "",
                    install: (prototype) => {
                        prototype.add = function (changes): Epochee { return; }
                    }
                });
            });

            // Revert changes for following tests
            Epochee.prototype.add = original_method;
        });
    });

    const instance = new Epochee();

    describe("can call instance.add(...)", function () {
        it("returns immutable copy", function () {
            const test = instance.add({});

            assert.notStrictEqual(instance, test);
            assert.notStrictEqual(instance.date, test.date);
        });

        it("", function () {
            
        });
    });

    describe("can call instance.addYears(...)");

    describe("can call instance.addMonths(...)");

    describe("can call instance.addDays(...)");

    describe("can call instance.addHours(...)");

    describe("can call instance.addMinutes(...)");

    describe("can call instance.addSeconds(...)");

    describe("can call instance.set(...)");

    describe("can call instance.setYears(...)");

    describe("can call instance.setMonths(...)");

    describe("can call instance.setDays(...)");

    describe("can call instance.setHours(...)");

    describe("can call instance.setMinutes(...)");

    describe("can call instance.setSeconds(...)");

    describe("can call instance.clone(...)");

    describe("can call instance.toDate(...)");

    describe("can call instance.toString(...)");

    describe("can call instance.toISOString(...)");

    describe("can call instance.toUTCString(...)");
});
