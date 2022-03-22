import { CalendarMonth } from '../CalendarMonth';
import { Modal } from "./Modal";

export class CalendarInMonthView {

  MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  today;
  todayReal;

  constructor(realToday) {
    console.log('REAL TODAY: ', realToday);
    this.todayReal = realToday; // "Real today" - a day to select in the current month
  }

  render(today) {

    this.today = today;       // "Today of the month" - a day to select by default in the month view

    this.renderDaysOfTheMonthOf(today);
    this.renderPreviousDayButton();
    this.renderNextDayButton();
  }

  renderDaysOfTheMonthOf(selectedMonth) {
    const calendarContainer = document.getElementById('calendar-in-month-view');
    calendarContainer.innerText = '';

    const calendarHeader = document.getElementById('calendar-header');
    const calHead = document.importNode(calendarHeader.content, true);
    calHead.querySelector('#current-month-and-year').innerHTML = `${this.MONTHS[selectedMonth.getMonth()]} ${selectedMonth.getFullYear()}`;
    calendarContainer.append(calHead);

    const calendarMonth = new CalendarMonth();
    calendarMonth.appendToEnd(selectedMonth, this.todayReal);
    calendarMonth.appendToBeginingAllDaysUpTo(selectedMonth, this.todayReal);
    calendarMonth.appendToEndAllDaysAfter(selectedMonth, this.todayReal);

    const calendarDays = calendarMonth.getData();

    const singleCalendarRowAkaWeek = document.getElementById('calendar-row');

    let weekday = 1;
    let dayEl;
    let weekEl;
    for (const calendarDayKey in calendarDays) {

      switch(weekday) {
        case 1:                                                                // In case of Monday,
          weekEl = document.importNode(singleCalendarRowAkaWeek.content, true);  // import the new row into calendar
          break;
        default:
          break;
      }

      switch(weekday) {
        case 1: // monday
          dayEl = weekEl.querySelector('.monday');
          break;
        case 2:
          dayEl = weekEl.querySelector('.tuesday');
          break;
        case 3:
          dayEl = weekEl.querySelector('.wednesday')
          break;
        case 4:
          dayEl = weekEl.querySelector('.thursday')
          break;
        case 5:
          dayEl = weekEl.querySelector('.friday')
          break;
        case 6:
          dayEl = weekEl.querySelector('.saturday')
          break;
        case 7:
          dayEl = weekEl.querySelector('.sunday')
          break;
      }

      dayEl.textContent = calendarDays[calendarDayKey].getDayOfMonth();
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
    const nextButton = document.querySelector('button.prev-month');
    nextButton.addEventListener('click', function () {
      this.today = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate());
      this.render(this.today);
    }.bind(this));
  }

  renderNextDayButton() {
    const nextButton = document.querySelector('button.next-month');
    nextButton.addEventListener('click', function () {
      this.today = new Date(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
      this.render(this.today);
    }.bind(this));
  }

  dayHandler() {
    if(this.classList.contains('day_before_today')) {
      console.log('Days before today are not clickable.');
      return;
    }
    const modal = new Modal(
        'loading-modal-content',
        'Loading data from API, please wait...',
    );
    modal.show();
    document.querySelector('.modal-header-text').innerHTML = 'Select reservation time';

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
            (result) => {
              const modalCentered = document.getElementsByClassName('centered');
              modalCentered[0].innerHTML = '';
              for(const reservationItem of result.data.reservations) {

                // Create an item
                const reservationButtonRow = document.getElementById('reservation-button-row');
                const reservationButtonRowInDom = document.importNode(reservationButtonRow.content, true);

                const timeEl = reservationButtonRowInDom.querySelector('p');
                const buttonEl = reservationButtonRowInDom.querySelector('button');

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

  static clickOnEventButtonHandler(event) {
    if(event.target.classList.contains('expired')) {
      CalendarInMonthView.clickOnExpiredHandler(event);
    } else if(event.target.classList.contains('reserved')) {
      CalendarInMonthView.clickOnReservedHandler(event);
    } else {
      CalendarInMonthView.clickOnSelectHandler(event);
    }
  }

  static clickOnExpiredHandler(event) {
    console.log('expired', event);
  }

  static clickOnReservedHandler(event) {
    console.log('reserved', event);
  }

  static clickOnSelectHandler(event) {
    const modalCentered = document.getElementsByClassName('centered');
    modalCentered[0].innerHTML = '';

    const reservationSubmissionFormTemplate = document.getElementById('reservation-submission-form-template');
    const reservationSubmissionFormInDom = document.importNode(reservationSubmissionFormTemplate.content, true);

    const submitButtonEl = reservationSubmissionFormInDom.querySelector('button');

    submitButtonEl.addEventListener('click', CalendarInMonthView.clickOnSubmitBookingHandler.bind(this, event));

    modalCentered[0].append(reservationSubmissionFormInDom);

    console.log('select', event);
  }

  static clickOnSubmitBookingHandler(event) {
    event.preventDefault(); // This is kind of redundant because we don't use "<form>"

    // TODO: What if values contain double quotes? I guess we need to escape such characters somehow..?
    const firstNameValue = document.getElementById('firstName').value;
    const lastNameValue = document.getElementById('lastName').value;

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
                      date: "${event.target.dataset.date}"
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
        (result) => {

          const modalCentered = document.getElementsByClassName('centered');

          try {
            document.querySelector('.modal-header-text').innerHTML = 'Reservation succeeded';
            modalCentered[0].innerHTML = `
              Id: ${result.data.bookReservation._id}<br>
              Name: ${result.data.bookReservation.firstName}<br>
              Last name: ${result.data.bookReservation.lastName}<br>
              Reservation date: ${result.data.bookReservation.date}<br>
            `;
            console.log(result);
          } catch (e) {
            document.querySelector('.modal-header-text').innerHTML = 'Reservation failed';
            modalCentered[0].innerHTML = `Check console logs for more information.`;
            console.log(e);
          }
        }
    );
  }
}