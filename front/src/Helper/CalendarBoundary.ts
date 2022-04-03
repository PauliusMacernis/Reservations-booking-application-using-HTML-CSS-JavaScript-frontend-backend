export class CalendarBoundary {

    public static isCalendarBeginning(today: Date, calendarDate: Date) {
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

    public static getLastDayOfTheMonth(today: Date) {
        const lastDayOfTheMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return lastDayOfTheMonth.getDate();
    }

    public static isDateTheLastDayOfTheTodaysMonth(calendarDate: Date, today: Date) {

        let upcomingMonth = today.getMonth() + 1;
        if(upcomingMonth === 12) {
            upcomingMonth = 0; // Start from January again.
        }

        return calendarDate.getDay() === 0 // Sunday
            &&
            (
                calendarDate.getDate() === CalendarBoundary.getLastDayOfTheMonth(today) && calendarDate.getMonth() === today.getMonth()  // The last day of this month
                ||
                calendarDate.getMonth() === upcomingMonth // [any other day of] the next month
            );
    }
}