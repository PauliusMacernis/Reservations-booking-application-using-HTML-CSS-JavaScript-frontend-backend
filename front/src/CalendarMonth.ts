import { CalendarDay } from './CalendarDay';
import { CalendarDayTypeForCss } from "./UI/CalendarDayTypeForCss";
import { DateRewind } from "./Helper/DateRewind";
import { CalendarBoundary } from "./Helper/CalendarBoundary";

export class CalendarMonth {

    private readonly calendar: CalendarDay[];

    public constructor() {
        this.calendar = [];
    }

    public appendToEnd(date: Date, dateTodayReal: Date): void {
        this.addItemAsDayOfThisMonthView(date, dateTodayReal, 'push', CalendarDayTypeForCss.DAY_OF_THIS_MONTH_VIEW);
    }

    public appendToBeginningAllDaysUpTo(today: Date, todayReal: Date): void {
        // Push all items before "today"
        let calendarDate = today;
        while(!CalendarBoundary.isCalendarBeginning(today, calendarDate)) {
            calendarDate = DateRewind.getADateFromADayBefore(calendarDate);

            if(calendarDate.getMonth() === today.getMonth()) {
                this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'unshift', CalendarDayTypeForCss.DAY_OF_THIS_MONTH_VIEW);
            } else {
                this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'unshift', CalendarDayTypeForCss.DAY_OF_PREV_MONTH_VIEW);
            }
        }
    }

    public appendToEndAllDaysAfter(today: Date, todayReal: Date): void {
        let calendarDate = today;

        while(!CalendarBoundary.isDateTheLastDayOfTheTodaysMonth(calendarDate, today)) {
            if(calendarDate === today) {
                calendarDate = DateRewind.getADateFromADayAfter(calendarDate);
                continue; // Do not add "today", it is added already
            }

            if (calendarDate.getMonth() === today.getMonth()) {
                this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'push', CalendarDayTypeForCss.DAY_OF_THIS_MONTH_VIEW);
            } else {
                this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'push', CalendarDayTypeForCss.DAY_OF_NEXT_MONTH_VIEW);
            }

            calendarDate = DateRewind.getADateFromADayAfter(calendarDate);
        }

        // Add the latest?
        if (calendarDate.getMonth() === today.getMonth()) {
            this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'push', CalendarDayTypeForCss.DAY_OF_THIS_MONTH_VIEW);
        } else {
            this.addItemAsDayOfThisMonthView(calendarDate, todayReal, 'push', CalendarDayTypeForCss.DAY_OF_NEXT_MONTH_VIEW);
        }
    }

    public getData(): CalendarDay[] {
        return this.calendar;
    }

    private addItemAsDayOfThisMonthView(date: Date, dateTodayReal: Date, pushOrUnshift: 'push'|'unshift', calendarDayTypeForThisMonthView: string): void {
        const dateShort = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
        const dateTodayRealShort = new Date(dateTodayReal.getFullYear(), dateTodayReal.getMonth(), 1, 0, 0, 0, 0);

        if (pushOrUnshift === 'push') {
            if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() === dateTodayReal.getDate()) {
                this.calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_MONTH, CalendarDayTypeForCss.TODAY));
            } else if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() > dateTodayReal.getDate()) {
                this.calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_MONTH, CalendarDayTypeForCss.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() < dateTodayReal.getDate()) {
                this.calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_MONTH, CalendarDayTypeForCss.DAY_BEFORE_TODAY));
            } else if (dateShort.getTime() > dateTodayRealShort.getTime() && date.getMonth() === dateTodayReal.getMonth()) {
                this.calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_NEXT_MONTH, CalendarDayTypeForCss.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() > dateTodayRealShort.getTime() && date.getMonth() !== dateTodayReal.getMonth()) {
                this.calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_NEXT_MONTH, CalendarDayTypeForCss.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() < dateTodayRealShort.getTime() && date.getMonth() === dateTodayReal.getMonth()) {
                this.calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_PREV_MONTH, CalendarDayTypeForCss.DAY_BEFORE_TODAY));
            } else if (dateShort.getTime() < dateTodayRealShort.getTime() && date.getMonth() !== dateTodayReal.getMonth()) {
                this.calendar.push(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_PREV_MONTH, CalendarDayTypeForCss.DAY_BEFORE_TODAY));
            } else {
                throw new Error('Such scenario must not be possible. #1.');
            }
        } else {
            if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() === dateTodayReal.getDate()) {
                this.calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_MONTH, CalendarDayTypeForCss.TODAY));
            } else if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() > dateTodayReal.getDate()) {
                this.calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_MONTH, CalendarDayTypeForCss.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() === dateTodayRealShort.getTime() && date.getDate() < dateTodayReal.getDate()) {
                this.calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_MONTH, CalendarDayTypeForCss.DAY_BEFORE_TODAY));
            } else if (dateShort.getTime() > dateTodayRealShort.getTime() && date.getMonth() === dateTodayReal.getMonth()) {
                this.calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_NEXT_MONTH, CalendarDayTypeForCss.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() > dateTodayRealShort.getTime() && date.getMonth() !== dateTodayReal.getMonth()) {
                this.calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_NEXT_MONTH, CalendarDayTypeForCss.DAY_AFTER_TODAY));
            } else if (dateShort.getTime() < dateTodayRealShort.getTime() && date.getMonth() === dateTodayReal.getMonth()) {
                this.calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_PREV_MONTH, CalendarDayTypeForCss.DAY_BEFORE_TODAY));
            } else if (dateShort.getTime() < dateTodayRealShort.getTime() && date.getMonth() !== dateTodayReal.getMonth()) {
                this.calendar.unshift(new CalendarDay(date, calendarDayTypeForThisMonthView, CalendarDayTypeForCss.DAY_OF_TODAYS_PREV_MONTH, CalendarDayTypeForCss.DAY_BEFORE_TODAY));
            } else {
                throw new Error('Such scenario must not be possible. #2.');
            }
        }
    }
}
