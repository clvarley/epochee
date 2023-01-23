import { assert } from "chai";
import { Datio } from "../../src/datio";
import { format } from "../../src/plugins/format";

describe("Plugin (core-format)", function () {
    it("registers method on prototype", function () {
        assert.notProperty(Datio.prototype, "format");

        Datio.extend(format);

        assert.property(Datio.prototype, "format");
        assert.isFunction(Datio.prototype.format);
    });

    it("can format date", function () {
        const y2k = new Datio(new Date(2000, 0, 1, 0, 0, 0));
        const output = y2k.format("Y-M-D");

        assert.strictEqual("2000-01-01", output);
    });
});
