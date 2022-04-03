export class CalendarDay {

    public date: Date;
    private readonly calendarDayDescriptorContextMonth: string;
    private readonly calendarDayDescriptorContextMonthRelToToday: string;
    private readonly calendarDayDescriptorContextToday: string;

    // TODO: calendarDayDescriptorContextMonth, calendarDayDescriptorContextMonthRelToToday, calendarDayDescriptorContextToday types
    public constructor(
        date: Date,
        calendarDayDescriptorContextMonth: string,
        calendarDayDescriptorContextMonthRelToToday: string,
        calendarDayDescriptorContextToday: string
    ) {
        this.date = date;
        this.calendarDayDescriptorContextMonth = calendarDayDescriptorContextMonth;
        this.calendarDayDescriptorContextMonthRelToToday = calendarDayDescriptorContextMonthRelToToday;
        this.calendarDayDescriptorContextToday = calendarDayDescriptorContextToday;
    }

    public getDayOfMonth(): number {
        return this.date.getDate();
    }

    public getClassForContextOfMonthView(): string {
        return this.calendarDayDescriptorContextMonth;
    }

    public getClassForContextOfMonthOfToday(): string {
        return this.calendarDayDescriptorContextMonthRelToToday;
    }

    public getClassForContextOfToday(): string {
        return this.calendarDayDescriptorContextToday;
    }
}
