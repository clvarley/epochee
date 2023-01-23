import type { DatioPlugin } from "../datio";
import { dateToFormat } from "date-write";

declare module "../datio" {
    interface Datio {
        format(this: Datio, format: string): string
    }
};

export const format: DatioPlugin = {
    name: "core-format",
    install: (prototype) => {
        prototype.format = function (format: string): string {
            return dateToFormat(this.date, format);
        };
    }
};
