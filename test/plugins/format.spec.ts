import { assert } from "chai";
import { Epochee } from "../../src/epochee";
import { format } from "../../src/plugins/format";

describe("Plugin (core-format)", function () {
    it("registers method on prototype", function () {
        assert.notProperty(Epochee.prototype, "format");

        Epochee.extend(format);

        assert.property(Epochee.prototype, "format");
        assert.isFunction(Epochee.prototype.format);
    });

    it("can format date", function () {
        const y2k = new Epochee(new Date(2000, 0, 1, 0, 0, 0));
        const output = y2k.format("Y-M-D");

        assert.strictEqual("2000-01-01", output);
    });
});
