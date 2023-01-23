import { assert } from "chai";
import { Epochee } from "../../src/epochee";
import { getters } from "../../src/plugins";

describe("Plugin (core-getters)", function () {
    it("registers properties on prototype", function () {
        const instance = new Epochee();

        assert.notProperty(instance, "year");
        assert.notProperty(instance, "month");
        assert.notProperty(instance, "day");
        assert.notProperty(instance, "hour");
        assert.notProperty(instance, "minute");
        assert.notProperty(instance, "second");

        Epochee.extend(getters);

        assert.property(instance, "year");
        assert.property(instance, "month");
        assert.property(instance, "day");
        assert.property(instance, "hour");
        assert.property(instance, "minute");
        assert.property(instance, "second");
    });

    // 11th March 1952 - 12:30:15
    const exampleDate = new Date(1952, 2, 11, 12, 30, 15);

    it("can read epochee.year", function () {
        const instance = new Epochee(exampleDate);

        assert.strictEqual(1952, instance.year);
    });

    it("can read epochee.month", function () {
        const instance = new Epochee(exampleDate);

        // Months are 0 indexed in vanilla JS - in Epochee they are not!
        assert.strictEqual(3, instance.month);
    });

    it("can read epochee.day", function () {
        const instance = new Epochee(exampleDate);

        assert.strictEqual(11, instance.day);
    });

    it("can read epochee.hour", function () {
        const instance = new Epochee(exampleDate);

        assert.strictEqual(12, instance.hour);
    });

    it("can read epochee.minute", function () {
        const instance = new Epochee(exampleDate);

        assert.strictEqual(30, instance.minute);
    });

    it("can read epochee.second", function () {
        const instance = new Epochee(exampleDate);

        assert.strictEqual(15, instance.second);
    });
});
