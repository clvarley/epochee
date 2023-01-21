import { getMethods, cloneWith } from "./utils";

export type DateTimeUpdate = {
    days?: number
    months?: number,
    years?: number,
    seconds?: number,
    minutes?: number,
    hours?: number
};

export type DatioPlugin = {
    name: string,
    install: (datio: typeof Datio.prototype) => void
};

/**
 * @internal
 */
const pluginError = (plugin: string, method: string): Error => {
    return new Error(
        `Datio plugin (${plugin}) cannot override core method '${method}'!`
    );
};

/**
 * Sane date manipulation.
 *
 * Datio provides a simple (and immutable) way to work with dates and times in
 * JavaScript. To begin, create a new instance of this class or call the `datio`
 * utility method.
 */
export class Datio {
    readonly date: Date;

    constructor(date?: Date) {
        this.date = date || new Date();
    };

    static extend(plugin: DatioPlugin): void {
        const before = getMethods(Datio.prototype);

        plugin.install(Datio.prototype);

        // Check plugin has not modified core methods
        before.forEach(([method, implementation]) => {
            if (Datio.prototype[method] !== implementation)
                throw pluginError(plugin.name, method);
        });
    };

    private change(changes: DateTimeUpdate): Datio {
        return new Datio(cloneWith(this.date, changes));
    };

    // ---- Manipulation ----

    addYears(years: number): Datio {
        return this.change({
            years: years
        });
    };

    addMonths(months: number): Datio {
        return this.change({
            months: months
        });
    };

    addDays(days: number): Datio {
        return this.change({
            days: days
        });
    };

    addHours(hours: number): Datio {
        return this.change({
            hours: hours
        });
    };

    addMinutes(minutes: number): Datio {
        return this.change({
            minutes: minutes
        });
    };

    addSeconds(seconds: number): Datio {
        return this.change({
            seconds: seconds
        });
    };

    // ---- Getters ----

    getDay(): number {
        return this.date.getDate();
    };

    getMonth(): number {
        return this.date.getMonth() + 1;
    };

    getYear(): number {
        return this.date.getFullYear();
    };

    getHours(): number {
          return this.date.getHours();
    };

    getMinutes(): number {
        return this.date.getMinutes();
    };

    getSeconds(): number {
        return this.date.getSeconds();
    };

    // ---- Utilities ----

    clone(): Datio {
        return this.change({});
    };

    toDate(): Date {
        return this.change({}).date;
    };

    toString(): string {
        return this.date.toString();
    };

    toISOString(): string {
        return this.date.toISOString();
    }

    toUTCString(): string {
        return this.date.toUTCString();
    }
};

/**
 * Create and return a new immutable datio instance
 *
 * @param date Input date
 * @return     Datio instance (immutable)
 */
export const datio = (date?: Date): Datio => new Datio(date);
