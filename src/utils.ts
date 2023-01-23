import type { DateTimeUpdate } from "./epochee";

/**
 * @internal
 */
export const normalise = (changes: DateTimeUpdate): Required<DateTimeUpdate> => {
    /** NOTE: Swap to using Object.assign when we reach ES6 minimum target */
    return {
        years: (changes.years !== undefined ? changes.years : 0),
        months: (changes.months !== undefined ? changes.months : 0),
        days: (changes.days !== undefined ? changes.days : 0),
        hours: (changes.hours !== undefined ? changes.hours : 0),
        minutes: (changes.minutes !== undefined ? changes.minutes : 0),
        seconds: (changes.seconds !== undefined ? changes.seconds : 0)
    }
};

/**
 * @internal
 */
export const cloneWith = (subject: Date, changes: Required<DateTimeUpdate>): Date => {
    return new Date(
        subject.getFullYear() + changes.years,
        subject.getMonth() + changes.months,
        subject.getDate() + changes.days,
        subject.getHours() + changes.hours,
        subject.getMinutes() + changes.minutes,
        subject.getSeconds() + changes.seconds
    );
};

type MethodPair<T> = [keyof T, Function];
type MethodMap<T> = Array<MethodPair<T>>;

/**
 * @internal
 */
export const getMethods = <T>(subject: T): MethodMap<T> => {
    return (Object.getOwnPropertyNames(subject) as (keyof T)[]).filter((property) => {
        return (subject[property] instanceof Function);
    }).map((property): MethodPair<T> => {
        return [property, subject[property] as Function];
    });
};
