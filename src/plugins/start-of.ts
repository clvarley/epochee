import type { EpocheePlugin, DateTimeUpdate } from "../epochee";
import { Epochee } from "../epochee";

declare module "../epochee" {
    interface Epochee {
        startOfYear(): Epochee;
        startOfMonth(): Epochee;
        startOfDay(): Epochee;
        startOfHour(): Epochee;
        startOfMinute(): Epochee;
    }
};

/**
 * Clone a date, applying the provided changes
 *
 * No need to check for negative values here, we are never going to need to
 * handle reversing month, day, hour, minute or second.
 *
 * @param subject Date to update
 * @param update  Requested changed
 * @return        Updated date (clone)
 */
const dateWith = (subject: Date, update: DateTimeUpdate): Date => {
    return new Date(
        update.years   ?? subject.getFullYear(),
        update.months  ?? subject.getMonth(),
        update.days    ?? subject.getDate(),
        update.hours   ?? subject.getHours(),
        update.minutes ?? subject.getMinutes(),
        update.seconds ?? subject.getSeconds()
    );
};

export const startOf: EpocheePlugin = {
    name: "core-start-of",
    install: (prototype) => {
        prototype.startOfYear = function (this: Epochee) {
            return new Epochee(
                dateWith(this.date, {
                    months: 0,
                    days: 1,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                })
            );
        };
        prototype.startOfMonth = function (this: Epochee) {
            return new Epochee(
                dateWith(this.date, {
                    days: 1,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                })
            );
        };
        prototype.startOfDay = function (this: Epochee) {
            return new Epochee(
                dateWith(this.date, {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                })
            );
        };
        prototype.startOfHour = function (this: Epochee) {
            return new Epochee(
                dateWith(this.date, {
                    minutes: 0,
                    seconds: 0
                })
            );
        };
        prototype.startOfMinute = function (this: Epochee) {
            return new Epochee(
                dateWith(this.date, {
                    seconds: 0
                })
            );
        };
    }
};
