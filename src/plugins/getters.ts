import type { EpocheePlugin } from "../epochee";

declare module "../epochee" {
    interface Epochee {
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
    }
};

export const getters: EpocheePlugin = {
    name: "core-getters",
    install: (prototype) => {
        Object.defineProperties(prototype, {
            year: {
                get: function () { return this.date.getFullYear(); }
            },
            month: {
                get: function () { return this.date.getMonth() + 1; }
            },
            day: {
                get: function () { return this.date.getDate(); }
            },
            hour: {
                get: function () { return this.date.getHours(); }
            },
            minute: {
                get: function () { return this.date.getMinutes(); }
            },
            second: {
                get: function () { return this.date.getSeconds(); }
            }
        });
    }
};
