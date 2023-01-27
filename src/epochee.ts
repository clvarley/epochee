import { getMethods, cloneWith, cloneSet, normalise } from "./utils";

export type DateTimeUpdate = {
    days?: number
    months?: number,
    years?: number,
    seconds?: number,
    minutes?: number,
    hours?: number
};

export type EpocheePlugin = {
    name: string,
    install: (epochee: typeof Epochee.prototype) => void
};

/**
 * @internal
 */
const pluginError = (plugin: string, method: string): Error => {
    return new Error(
        `Epochee plugin (${plugin}) cannot override core method '${method}'!`
    );
};

/**
 * Sane date manipulation.
 *
 * Epochee provides a simple (and immutable) way to work with dates and times in
 * JavaScript. To begin, create a new instance of this class or call the
 * `epochee()` utility method.
 */
export class Epochee {
    readonly date: Date;

    constructor(date?: Date) {
        // Clone the passed date so there are no external refs to it
        this.date = date ? new Date(date.valueOf()) : new Date();
    };

    static extend(plugin: EpocheePlugin): void {
        const before = getMethods(this.prototype);

        plugin.install(this.prototype);

        // Check plugin has not modified core methods
        before.forEach(([method, implementation]) => {
            if (this.prototype[method] !== implementation)
                throw pluginError(plugin.name, method);
        });
    };

    // ---- Manipulation ----

    add(changes: DateTimeUpdate): Epochee {
        return new Epochee(cloneWith(this.date, normalise(changes)));
    };

    addYears(years: number): Epochee {
        return this.add({
            years: years
        });
    };

    addMonths(months: number): Epochee {
        return this.add({
            months: months
        });
    };

    addDays(days: number): Epochee {
        return this.add({
            days: days
        });
    };

    addHours(hours: number): Epochee {
        return this.add({
            hours: hours
        });
    };

    addMinutes(minutes: number): Epochee {
        return this.add({
            minutes: minutes
        });
    };

    addSeconds(seconds: number): Epochee {
        return this.add({
            seconds: seconds
        });
    };

    // ---- Setters ----

    set(changes: DateTimeUpdate): Epochee {
        return new Epochee(cloneSet(this.date, changes));
    };

    setYears(years: number): Epochee {
        return this.set({
            years: years
        });
    };

    setMonths(months: number): Epochee {
        return this.set({
            months: months
        });
    };

    setDays(days: number): Epochee {
        return this.set({
            days: days
        });
    };

    setHours(hours: number): Epochee {
        return this.set({
            hours: hours
        });
    };

    setMinutes(minutes: number): Epochee {
        return this.set({
            minutes: minutes
        });
    };

    setSeconds(seconds: number): Epochee {
        return this.set({
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

    clone(): Epochee {
        return new Epochee(this.date);
    };

    toDate(): Date {
        return cloneSet(this.date, {});
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
 * Create and return a new immutable epochee instance
 *
 * @param date Input date
 * @return     Epochee instance (immutable)
 */
export const epochee = (date?: Date): Epochee => new Epochee(date);
