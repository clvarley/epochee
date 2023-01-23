import { assert } from "chai";
import { Epochee } from "../../src/epochee";
import { startOf } from "../../src/plugins";

describe("Plugin (core-start-of)", function () {
    it("registers methods on prototype", function () {
        assert.notProperty(Epochee.prototype, "startOfYear");
        assert.notProperty(Epochee.prototype, "startOfMonth");
        assert.notProperty(Epochee.prototype, "startOfDay");
        assert.notProperty(Epochee.prototype, "startOfHour");
        assert.notProperty(Epochee.prototype, "startOfMinute");

        Epochee.extend(startOf);

        assert.property(Epochee.prototype, "startOfYear");
        assert.property(Epochee.prototype, "startOfMonth");
        assert.property(Epochee.prototype, "startOfDay");
        assert.property(Epochee.prototype, "startOfHour");
        assert.property(Epochee.prototype, "startOfMinute");
    });

    // 11th March 1952 - 12:30:15
    const exampleDate = new Date(1952, 2, 11, 12, 30, 15);

    it("can call epochee.startOfYear(...)", function () {
        const instance = (new Epochee(exampleDate)).startOfYear();

        assert.strictEqual(instance.date.getFullYear(), 1952, "Incorrect year");
        assert.strictEqual(instance.date.getMonth(), 0,       "Incorrect month");
        assert.strictEqual(instance.date.getDate(), 1,        "Incorrect day");
        assert.strictEqual(instance.date.getHours(), 0,       "Incorrect hour");
        assert.strictEqual(instance.date.getMinutes(), 0,     "Incorrect minute");
        assert.strictEqual(instance.date.getSeconds(), 0,     "Incorrect second");
    });

    it("can call epochee.startOfMonth(...)", function () {
        const instance = (new Epochee(exampleDate)).startOfMonth();

        assert.strictEqual(instance.date.getFullYear(), 1952, "Incorrect year");
        assert.strictEqual(instance.date.getMonth(), 2,       "Incorrect month");
        assert.strictEqual(instance.date.getDate(), 1,        "Incorrect day");
        assert.strictEqual(instance.date.getHours(), 0,       "Incorrect hour");
        assert.strictEqual(instance.date.getMinutes(), 0,     "Incorrect minute");
        assert.strictEqual(instance.date.getSeconds(), 0,     "Incorrect second");
    });

    it("can call epochee.startOfDay(...)", function () {
        const instance = (new Epochee(exampleDate)).startOfDay();

        assert.strictEqual(instance.date.getFullYear(), 1952, "Incorrect year");
        assert.strictEqual(instance.date.getMonth(), 2,       "Incorrect month");
        assert.strictEqual(instance.date.getDate(), 11,       "Incorrect day");
        assert.strictEqual(instance.date.getHours(), 0,       "Incorrect hour");
        assert.strictEqual(instance.date.getMinutes(), 0,     "Incorrect minute");
        assert.strictEqual(instance.date.getSeconds(), 0,     "Incorrect second");
    });

    it("can call epochee.startOfHour(...)", function () {
        const instance = (new Epochee(exampleDate)).startOfHour();

        assert.strictEqual(instance.date.getFullYear(), 1952, "Incorrect year");
        assert.strictEqual(instance.date.getMonth(), 2,       "Incorrect month");
        assert.strictEqual(instance.date.getDate(), 11,       "Incorrect day");
        assert.strictEqual(instance.date.getHours(), 12,      "Incorrect hour");
        assert.strictEqual(instance.date.getMinutes(), 0,     "Incorrect minute");
        assert.strictEqual(instance.date.getSeconds(), 0,     "Incorrect second");
    });

    it("can call epochee.startOfMinute(...)", function () {
        const instance = (new Epochee(exampleDate)).startOfMinute();

        assert.strictEqual(instance.date.getFullYear(), 1952, "Incorrect year");
        assert.strictEqual(instance.date.getMonth(), 2,       "Incorrect month");
        assert.strictEqual(instance.date.getDate(), 11,       "Incorrect day");
        assert.strictEqual(instance.date.getHours(), 12,      "Incorrect hour");
        assert.strictEqual(instance.date.getMinutes(), 30,    "Incorrect minute");
        assert.strictEqual(instance.date.getSeconds(), 0,     "Incorrect second");
    });
});
