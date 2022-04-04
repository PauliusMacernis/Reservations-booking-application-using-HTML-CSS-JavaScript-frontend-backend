export class DateRewind {

    public static getADateFromADayAfter(today: Date): Date {
        const tomorrow = new Date(today.getTime());
        tomorrow.setDate(today.getDate() + 1);

        return tomorrow;
    }

    public static getADateFromADayBefore(today: Date): Date {
        const yesterday = new Date(today.getTime());
        yesterday.setDate(today.getDate() - 1);

        return yesterday;
    }
}