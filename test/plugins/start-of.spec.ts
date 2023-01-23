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

        assert.strictEqual(instance.date.getFullYear(), 1952);
        assert.strictEqual(instance.date.getMonth(), 0);
        assert.strictEqual(instance.date.getDate(), 1);
        assert.strictEqual(instance.date.getHours(), 0);
        assert.strictEqual(instance.date.getMinutes(), 0);
        assert.strictEqual(instance.date.getSeconds(), 0);
    });

    it("can call epochee.startOfMonth(...)", function () {
        const instance = (new Epochee(exampleDate)).startOfMonth();

        assert.strictEqual(instance.date.getFullYear(), 1952);
        assert.strictEqual(instance.date.getMonth(), 2);
        assert.strictEqual(instance.date.getDate(), 1);
        assert.strictEqual(instance.date.getHours(), 0);
        assert.strictEqual(instance.date.getMinutes(), 0);
        assert.strictEqual(instance.date.getSeconds(), 0);
    });

    it("can call epochee.startOfDay(...)", function () {
        const instance = (new Epochee(exampleDate)).startOfMonth();

        assert.strictEqual(instance.date.getFullYear(), 1952);
        assert.strictEqual(instance.date.getMonth(), 2);
        assert.strictEqual(instance.date.getDate(), 11);
        assert.strictEqual(instance.date.getHours(), 0);
        assert.strictEqual(instance.date.getMinutes(), 0);
        assert.strictEqual(instance.date.getSeconds(), 0);
    });

    it("can call epochee.startOfHour(...)", function () {
        const instance = (new Epochee(exampleDate)).startOfMonth();

        assert.strictEqual(instance.date.getFullYear(), 1952);
        assert.strictEqual(instance.date.getMonth(), 2);
        assert.strictEqual(instance.date.getDate(), 11);
        assert.strictEqual(instance.date.getHours(), 12);
        assert.strictEqual(instance.date.getMinutes(), 0);
        assert.strictEqual(instance.date.getSeconds(), 0);
    });

    it("can call epochee.startOfMonth(...)", function () {
        const instance = (new Epochee(exampleDate)).startOfMonth();

        assert.strictEqual(instance.date.getFullYear(), 1952);
        assert.strictEqual(instance.date.getMonth(), 2);
        assert.strictEqual(instance.date.getDate(), 11);
        assert.strictEqual(instance.date.getHours(), 12);
        assert.strictEqual(instance.date.getMinutes(), 30);
        assert.strictEqual(instance.date.getSeconds(), 0);
    });
});
