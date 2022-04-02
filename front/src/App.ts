import { CalendarInMonthView } from './CalendarInMonthView';

class App {
    constructor() {
        this.index();
    }

    index(): void {
        const today = new Date();

        const CalendarInMonthViewObj = new CalendarInMonthView(today);
        CalendarInMonthViewObj.render(today);
    }
}

new App();

console.log('Hello!!');