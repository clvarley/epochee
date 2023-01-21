import type { DateTimeUpdate } from "./datio";

/**
 * @internal
 */
export const cloneWith = (subject: Date, changes: DateTimeUpdate): Date => {
    return new Date(
        subject.getFullYear() + (changes.years || 0),
        subject.getMonth() + (changes.months || 0),
        subject.getDate() + (changes.days || 0),
        subject.getHours() + (changes.hours || 0),
        subject.getMinutes() + (changes.minutes || 0),
        subject.getSeconds() + (changes.seconds || 0)
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
