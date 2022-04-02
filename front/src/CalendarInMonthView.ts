import { CalendarMonth } from './CalendarMonth';
import { Modal } from "./Modal";

type BookReservation = {  // TODO: move this out to it's own file
  _id: string,
  firstName: string,
  lastName: string,
  date: string,
  createdAt: string
}

type Reservation = { // TODO: move this out to it's own file
  _id: string,
  date: string,
  reserved: boolean
  expired: boolean
}

type BookingError = {
  'message': string,
  'length': number
}

export class CalendarInMonthView {

  MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  today: Date;
  todayReal: Date;

  constructor(realToday: Date) {
    console.log('REAL TODAY: ', realToday);
    this.todayReal = realToday; // "Real today" - a day to select in the current month
    this.today = realToday;
  }

  render(today: Date): void {
    this.today = today;       // "Today of the month" - a day to select by default in the month view

    this.renderDaysOfTheMonthOf(today);
    this.renderPreviousDayButton();
    this.renderNextDayButton();
  }

  renderDaysOfTheMonthOf(selectedMonth: Date): void {
    const calendarContainer = document.getElementById('calendar-in-month-view') as HTMLElement;
    calendarContainer.innerText = '';

    const calendarHeader = document.getElementById('calendar-header') as HTMLTemplateElement;
    const calHead = document.importNode(calendarHeader.content, true);
    const currentMonthAndYearEl = calHead.querySelector('#current-month-and-year') as HTMLElement;
    currentMonthAndYearEl.innerHTML = `${this.MONTHS[selectedMonth.getMonth()]} ${selectedMonth.getFullYear()}`;
    calendarContainer.append(calHead);

    const calendarMonth = new CalendarMonth();
    calendarMonth.appendToEnd(selectedMonth, this.todayReal);
    calendarMonth.appendToBeginingAllDaysUpTo(selectedMonth, this.todayReal);
    calendarMonth.appendToEndAllDaysAfter(selectedMonth, this.todayReal);

    const calendarDays = calendarMonth.getData();

    const singleCalendarRowAkaWeek = document.getElementById('calendar-row') as HTMLTemplateElement;

    let weekday: 1|2|3|4|5|6|7 = 1;
    let weekEl = document.importNode(singleCalendarRowAkaWeek.content, true) as DocumentFragment; // TODO: Is it DocumentFragment for real?
    let dayEl = weekEl.querySelector('.monday')! as HTMLElement;
    let firstRow = true as boolean;
    for (const calendarDayKey in calendarDays) {

      switch(weekday) {
        case 1:
          if(firstRow === false) {
            weekEl = document.importNode(singleCalendarRowAkaWeek.content, true);  // import the new row into calendar
          }
          break;
        default:
          break;
      }

      switch(weekday) {
        case 1: // monday
          if(firstRow === false) {
            dayEl = weekEl.querySelector('.monday')!;
          }
          break;
        case 2:
          dayEl = weekEl.querySelector('.tuesday')!;
          break;
        case 3:
          dayEl = weekEl.querySelector('.wednesday')!;
          break;
        case 4:
          dayEl = weekEl.querySelector('.thursday')!;
          break;
        case 5:
          dayEl = weekEl.querySelector('.friday')!;
          break;
        case 6:
          dayEl = weekEl.querySelector('.saturday')!;
          break;
        case 7:
          dayEl = weekEl.querySelector('.sunday')!;
          break;
      }

      firstRow = false; // todo: move to the bottom of the block scope

      dayEl.textContent = calendarDays[calendarDayKey].getDayOfMonth().toString();
      dayEl.classList.add(calendarDays[calendarDayKey].getClassForContextOfMonthView());
      dayEl.classList.add(calendarDays[calendarDayKey].getClassForContextOfMonthOfToday());
      dayEl.classList.add(calendarDays[calendarDayKey].getClassForContextOfToday());
      dayEl.addEventListener('click', this.dayHandler);
      dayEl.dataset.dateTime = calendarDays[calendarDayKey].date.toString();

      switch(weekday) {
        case 7:                               // In case of Sunday,
          calendarContainer.append(weekEl);   // append the populated row into calendar view,
          weekday = 1;                        // treat the upcoming day as Monday.
          break;
        default:
          weekday++;                          // Treat the upcoming day as Tuesday-Sunday.
          break;
      }
    }
  }

  renderPreviousDayButton() {
    const nextButton = document.querySelector('button.prev-month') as HTMLButtonElement;
    nextButton.addEventListener('click', function (this: CalendarInMonthView) {
      this.today = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate());
      this.render(this.today);
    }.bind(this));
  }

  renderNextDayButton() {
    const nextButton = document.querySelector('button.next-month') as HTMLButtonElement;
    nextButton.addEventListener('click', function (this: CalendarInMonthView) {
      this.today = new Date(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
      this.render(this.today);
    }.bind(this));
  }

  dayHandler(this: HTMLElement) {
    if(this.classList.contains('day_before_today')) {
      console.log('Days before today are not clickable.');
      return;
    }
    const modal = new Modal(
        'loading-modal-content',
        'Loading data from API, please wait...',
    );
    modal.show();
    const modalHeaderText = document.querySelector('.modal-header-text') as HTMLElement;
    modalHeaderText.innerHTML = 'Select reservation time';

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
            reservations(date: "${this.dataset.dateTime}") {
                _id
                date
                reserved
                expired
            }
        }`
      })
    })
        .then(
            (res) => res.json()
        )
        .then(
            (result: { data: { reservations: Reservation[] } }) => {
              console.log(result);
              const modalCentered = document.getElementsByClassName('centered');
              modalCentered[0].innerHTML = '';
              for(const reservationItem of result.data.reservations) {

                // Create an item
                const reservationButtonRow = document.getElementById('reservation-button-row') as HTMLTemplateElement;
                const reservationButtonRowInDom = document.importNode(reservationButtonRow.content, true);

                const timeEl = reservationButtonRowInDom.querySelector('p') as HTMLElement;
                const buttonEl = reservationButtonRowInDom.querySelector('button') as HTMLButtonElement;

                buttonEl.classList.add('button-to-initiate-booking');
                buttonEl.dataset.date = `${reservationItem.date}`;
                buttonEl.addEventListener('click', CalendarInMonthView.clickOnEventButtonHandler);

                if(reservationItem.expired) {
                  buttonEl.classList.add('expired');
                  buttonEl.innerText = "Expired";
                  buttonEl.disabled = true;
                } else if(reservationItem.reserved) {
                  buttonEl.classList.add('reserved');
                  buttonEl.innerText = "Reserved";
                  buttonEl.disabled = true;
                } else {
                  buttonEl.classList.add('select');
                  buttonEl.innerText = "Select";
                }

                timeEl.innerText = `${reservationItem.date}`;
                modalCentered[0].append(reservationButtonRowInDom);
              }
            }
        );
  }

  static clickOnEventButtonHandler(event: Event): void {
    const eventTarget = event.target as HTMLElement;

    if(eventTarget.classList.contains('expired')) {
      CalendarInMonthView.clickOnExpiredHandler(event);
    } else if(eventTarget.classList.contains('reserved')) {
      CalendarInMonthView.clickOnReservedHandler(event);
    } else {
      CalendarInMonthView.clickOnSelectHandler(event);
    }
  }

  static clickOnExpiredHandler(event: Event) {
    console.log('expired', event);
  }

  static clickOnReservedHandler(event: Event) {
    console.log('reserved', event);
  }

  static clickOnSelectHandler(event: Event) {
    const modalCentered = document.getElementsByClassName('centered');
    modalCentered[0].innerHTML = '';

    const reservationSubmissionFormTemplate = document.getElementById('reservation-submission-form-template') as HTMLTemplateElement;
    const reservationSubmissionFormInDom = document.importNode(reservationSubmissionFormTemplate.content, true);

    const submitButtonEl = reservationSubmissionFormInDom.querySelector('button') as HTMLButtonElement;

    submitButtonEl.addEventListener('click', CalendarInMonthView.clickOnSubmitBookingHandler.bind(this, event));

    modalCentered[0].append(reservationSubmissionFormInDom);

    console.log('select', event);
  }

  static clickOnSubmitBookingHandler(event: Event ) {
    //event.preventDefault(); // This is kind of redundant because we don't use "<form>"

    const eventTarget = event.target as HTMLElement;

    // TODO: What if values contain double quotes? I guess we need to escape such characters somehow..?
    const firstName = document.getElementById('firstName') as HTMLInputElement;
    const firstNameValue = firstName.value;

    const lastName = document.getElementById('lastName') as HTMLInputElement;
    const lastNameValue = lastName.value;

    const modalCentered = document.getElementsByClassName('centered');
    modalCentered[0].innerHTML = `<div class="lds-dual-ring"></div>`;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
                    bookReservation(reservationInput: {
                      firstName: "${firstNameValue}",
                      lastName: "${lastNameValue}",
                      date: "${eventTarget.dataset.date}"
                    }) {
                      _id
                      firstName
                      lastName
                      date
                      createdAt
                      updatedAt
                    }
                  }`
      })
    })
    .then(
        (res) => res.json()
    )
    .then(
        (result: { data: { bookReservation: BookReservation }, errors: BookingError[] }) => {

          console.log(result);

          const modalCentered = document.getElementsByClassName('centered') as HTMLCollectionOf<HTMLElement>;

          try {

            console.log(result);
            const modalHeaderText = document.querySelector('.modal-header-text') as HTMLElement;

            if(result && result.errors && result.errors.length > 0) {
              modalHeaderText.innerHTML = 'Reservation failed';
              modalCentered[0].innerHTML = `
                Error: ${result.errors[0].message}
                For more information on the error refer to the console log information.
              `;
            } else {
              modalHeaderText.innerHTML = 'Reservation succeeded';
              modalCentered[0].innerHTML = `
              Id: ${result.data.bookReservation._id}<br>
              Name: ${result.data.bookReservation.firstName}<br>
              Last name: ${result.data.bookReservation.lastName}<br>
              Reservation date: ${result.data.bookReservation.date}<br>
            `;
            }
          } catch (e) {
            const modalHeaderTextEl = document.querySelector('.modal-header-text') as HTMLElement;
            modalHeaderTextEl.innerHTML = 'Reservation failed';
            modalCentered[0].innerHTML = `Check console logs for more information.`;
            console.log(e);
          }
        }
    );
  }
}
