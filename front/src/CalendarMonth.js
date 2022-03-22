import { CalendarDay } from './CalendarDay';
import { CalendarDayType } from "./CalendarDayType";

export class CalendarMonth {

    #calendar;

    constructor() {
        this.#calendar = [];
    }

    appendToEnd(date, dateTodayReal) {
        this.addItemAsDayOfThisMonthView(date, dateTodayReal, 'push', CalendarDayType.DAY_OF_THIS_MONTH_VIEW);
    }

    addItemAsDayOfThisMonthView(date, dateTodayReal, pushOrUnshift, calendarDayTypeForThisMonthView) {
        const dateShort = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
        const dateTodayRealShort = new Date(dateTodayReal.getFullYear(), dateTodayReal.getMonth(), 1, 0, 0, 0, 0);

        if (pushOrUnshift === 'push') {
            if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() === dateTodayReal.getDate()) {
                this.#calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_MONTH, CalendarDayType.TODAY));
            } else if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() > dateTodayReal.getDate()) {
                this.#calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_MONTH, CalendarDayType.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() < dateTodayReal.getDate()) {
                this.#calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_MONTH, CalendarDayType.DAY_BEFORE_TODAY));
            } else if (dateShort.getTime() > dateTodayRealShort.getTime() && date.getMonth() === dateTodayReal.getMonth()) {
                this.#calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_NEXT_MONTH, CalendarDayType.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() > dateTodayRealShort.getTime() && date.getMonth() !== dateTodayReal.getMonth()) {
                this.#calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_NEXT_MONTH, CalendarDayType.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() < dateTodayRealShort.getTime() && date.getMonth() === dateTodayReal.getMonth()) {
                this.#calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_PREV_MONTH, CalendarDayType.DAY_BEFORE_TODAY));
            } else if (dateShort.getTime() < dateTodayRealShort.getTime() && date.getMonth() !== dateTodayReal.getMonth()) {
                this.#calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_PREV_MONTH, CalendarDayType.DAY_BEFORE_TODAY));
            } else {
                throw new Error('Such scenario must not be possible. #1.');
            }
        } else {
            if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() === dateTodayReal.getDate()) {
                this.#calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_MONTH, CalendarDayType.TODAY));
            } else if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() > dateTodayReal.getDate()) {
                this.#calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_MONTH, CalendarDayType.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() < dateTodayReal.getDate()) {
                this.#calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_MONTH, CalendarDayType.DAY_BEFORE_TODAY));
            } else if (dateShort.getTime() > dateTodayRealShort.getTime() && date.getMonth() === dateTodayReal.getMonth()) {
                this.#calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_NEXT_MONTH, CalendarDayType.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() > dateTodayRealShort.getTime() && date.getMonth() !== dateTodayReal.getMonth()) {
                this.#calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_NEXT_MONTH, CalendarDayType.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() < dateTodayRealShort.getTime() && date.getMonth() === dateTodayReal.getMonth()) {
                this.#calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_PREV_MONTH, CalendarDayType.DAY_BEFORE_TODAY));
            } else if (dateShort.getTime() < dateTodayRealShort.getTime() && date.getMonth() !== dateTodayReal.getMonth()) {
                this.#calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayType.DAY_OF_TODAYS_PREV_MONTH, CalendarDayType.DAY_BEFORE_TODAY));
            } else {
                throw new Error('Such scenario must not be possible. #2.');
            }
        }

    }

    isCalendarBegining(today, calendarDate) {
        let previousMonth = today.getMonth() - 1;

        if (previousMonth === -1) {
            previousMonth = 11; // jump to the prev year Dec.
        }

        return calendarDate.getDay() === 1 // Monday
            &&
            (
                calendarDate.getDate() === 1 && calendarDate.getMonth() === today.getMonth()  // 1st of this month
                ||
                calendarDate.getMonth() === previousMonth // [any other day of] the previous month
            );
    }

    getADateFromADayBefore(today) {
        const yesterday = new Date(today.getTime());
        yesterday.setDate(today.getDate() - 1);

        return yesterday;
    }

    appendToBeginingAllDaysUpTo(today, todayReal) {
        // Push all items before "today"
        let calendarDate = today;
        while(!this.isCalendarBegining(today, calendarDate)) {
            calendarDate = this.getADateFromADayBefore(calendarDate);

            if(calendarDate.getMonth() === today.getMonth()) {
                this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'unshift', CalendarDayType.DAY_OF_THIS_MONTH_VIEW);
            } else {
                this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'unshift', CalendarDayType.DAY_OF_PREV_MONTH_VIEW);
            }
        }
    }

    getADateFromADayAfter(today) {
        const tomorrow = new Date(today.getTime());
        tomorrow.setDate(today.getDate() + 1);

        return tomorrow;
    }

    getLastDayOfTheMonth(today) {
        const lastDayOfTheMonth = new Date(today.getYear(), today.getMonth() + 1, 0);
        return lastDayOfTheMonth.getDate();
    }

    isDateTheLastDayOfTheTodaysMonth(calendarDate, today) {

        let upcomingMonth = today.getMonth() + 1;
        if(upcomingMonth === 12) {
            upcomingMonth = 0; // Start from January again.
        }

        return calendarDate.getDay() === 0 // Sunday
            &&
            (
                calendarDate.getDate() === this.getLastDayOfTheMonth(today) && calendarDate.getMonth() === today.getMonth()  // The last day of this month
                ||
                calendarDate.getMonth() === upcomingMonth // [any other day of] the next month
            );
    }


    appendToEndAllDaysAfter(today, todayReal) {
        let calendarDate = today;
        while(!this.isDateTheLastDayOfTheTodaysMonth(calendarDate, today)) {
            if(calendarDate === today) {
                calendarDate = this.getADateFromADayAfter(calendarDate);
                continue; // Do not add "today", it is added already
            }

            if (calendarDate.getMonth() === today.getMonth()) {
                this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'push', CalendarDayType.DAY_OF_THIS_MONTH_VIEW);
            } else {
                this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'push', CalendarDayType.DAY_OF_NEXT_MONTH_VIEW);
            }

            calendarDate = this.getADateFromADayAfter(calendarDate);
        }

        // Add the latest?
        if (calendarDate.getMonth() === today.getMonth()) {
            this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'push', CalendarDayType.DAY_OF_THIS_MONTH_VIEW);
        } else {
            this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'push', CalendarDayType.DAY_OF_NEXT_MONTH_VIEW);
        }
    }

    getData() {
        return this.#calendar;
    }
}