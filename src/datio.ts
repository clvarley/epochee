export type DateTimeProps = {
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

type MethodPair<T> = [keyof T, Function];
type MethodMap<T> = Array<MethodPair<T>>;

/**
 * @internal
 */
const cloneWith = (subject: Date, changes: DateTimeProps): Date => {
    return new Date(
        subject.getFullYear() + (changes.years || 0),
        subject.getMonth() + (changes.months || 0),
        subject.getDate() + (changes.days || 0),
        subject.getHours() + (changes.hours || 0),
        subject.getMinutes() + (changes.minutes || 0),
        subject.getSeconds() + (changes.seconds || 0)
    );
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
 * @internal
 */
const getMethods = <T>(subject: T): MethodMap<T> => {
    return (Object.getOwnPropertyNames(subject) as (keyof T)[]).filter((property) => {
        return (subject[property] instanceof Function);
    }).map((property): MethodPair<T> => {
        return [property, subject[property] as Function];
    });
};

/**
 * Sane date manipulation.
 *
 * Datio provides a simple (and immutable) way to work with dates and times in
 * JavaScript.
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

    private change(changes: DateTimeProps): Datio {
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
}

export const datio = (date?: Date): Datio => new Datio(date);
