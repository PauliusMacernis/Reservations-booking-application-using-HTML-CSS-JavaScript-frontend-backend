export class CalendarDayType {

    /*
        Maps a day type (JavaScript code element) to CSS class name
     */
    static TODAY = 'today';
    static DAY_BEFORE_TODAY = 'day_before_today';
    static DAY_AFTER_TODAY = 'day_after_today';

    // In calendar, relative to real today date
    static DAY_OF_TODAYS_MONTH = 'day_of_todays_month';
    static DAY_OF_TODAYS_PREV_MONTH = 'day_of_todays_prev_month';
    static DAY_OF_TODAYS_NEXT_MONTH = 'day_of_todays_next_month';

    // In calendar, relative to a month selected to view
    static DAY_OF_THIS_MONTH_VIEW = 'day_of_this_month_relative_to_selected_month';
    static DAY_OF_PREV_MONTH_VIEW = 'day_of_previous_month_relative_to_selected_month';
    static DAY_OF_NEXT_MONTH_VIEW = 'day_of_next_month_relative_to_selected_month';

}