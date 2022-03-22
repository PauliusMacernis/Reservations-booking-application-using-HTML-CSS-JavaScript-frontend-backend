export class CalendarDay {

    date;
    calendarDayDescriptorContextMonth;
    calendarDayDescriptorContextMonthRelToToday;
    calendarDayDescriptorContextToday;

    constructor(date, calendarDayDescriptorContextMonth, calendarDayDescriptorContextMonthRelToToday, calendarDayDescriptorContextToday) {
        this.date = date;
        this.calendarDayDescriptorContextMonth = calendarDayDescriptorContextMonth;
        this.calendarDayDescriptorContextMonthRelToToday = calendarDayDescriptorContextMonthRelToToday;
        this.calendarDayDescriptorContextToday = calendarDayDescriptorContextToday;
    }

    getDayOfMonth() {
        return this.date.getDate();
    }

    getClassForContextOfMonthView() {
        return this.calendarDayDescriptorContextMonth;
    }

    getClassForContextOfMonthOfToday() {
        return this.calendarDayDescriptorContextMonthRelToToday;
    }

    getClassForContextOfToday() {
        return this.calendarDayDescriptorContextToday;
    }
}