// import {CalendarDayType} from "./CalendarDayType";

export class CalendarDay {

    date: Date;
    calendarDayDescriptorContextMonth: string;
    calendarDayDescriptorContextMonthRelToToday: string;
    calendarDayDescriptorContextToday: string;

    // TODO: calendarDayDescriptorContextMonth, calendarDayDescriptorContextMonthRelToToday, calendarDayDescriptorContextToday types
    constructor(date: Date, calendarDayDescriptorContextMonth: string, calendarDayDescriptorContextMonthRelToToday: string, calendarDayDescriptorContextToday: string) {
        this.date = date;
        this.calendarDayDescriptorContextMonth = calendarDayDescriptorContextMonth;
        this.calendarDayDescriptorContextMonthRelToToday = calendarDayDescriptorContextMonthRelToToday;
        this.calendarDayDescriptorContextToday = calendarDayDescriptorContextToday;
    }

    getDayOfMonth(): number {
        return this.date.getDate();
    }

    getClassForContextOfMonthView(): string {
        return this.calendarDayDescriptorContextMonth;
    }

    getClassForContextOfMonthOfToday(): string {
        return this.calendarDayDescriptorContextMonthRelToToday;
    }

    getClassForContextOfToday(): string {
        return this.calendarDayDescriptorContextToday;
    }
}