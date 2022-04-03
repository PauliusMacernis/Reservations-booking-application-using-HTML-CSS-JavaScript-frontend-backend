import { CalendarInMonthView } from './UI/CalendarInMonthView';

class App {
    public constructor() {
        App.init();
    }

    private static init(): void {
        const today = new Date();

        const CalendarInMonthViewObj = new CalendarInMonthView(today);
        CalendarInMonthViewObj.render(today);
    }
}

new App();
