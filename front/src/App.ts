import { CalendarInMonthView } from './UI/CalendarInMonthView';

class App {
    public constructor() {
        this.init();
    }

    private init(): void {
        const today = new Date();

        const CalendarInMonthViewObj = new CalendarInMonthView(today);
        CalendarInMonthViewObj.render(today);
    }
}

new App();
