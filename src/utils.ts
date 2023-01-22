import type { DateTimeUpdate } from "./datio";

/**
 * @internal
 */
export const normalise = (changes: DateTimeUpdate): Required<DateTimeUpdate> => {
    return Object.assign({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }, changes);
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
