import type { EpocheePlugin } from "../epochee";
import { dateToFormat } from "date-write";

declare module "../epochee" {
    interface Epochee {
        format(this: Epochee, format: string): string
    }
};

export const format: EpocheePlugin = {
    name: "core-format",
    install: (prototype) => {
        prototype.format = function (format: string): string {
            return dateToFormat(this.date, format);
        };
    }
};
