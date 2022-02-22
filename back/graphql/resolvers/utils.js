const Reservation = require('../../models/reservation');

const {
    dateLessThanWeek,
    dateToString,
    dateWithoutMinutesAndSeconds,
    isValidDate
} = require('../../helpers/date');

/**
 * @param {Date} date
 * @return {Date}
 */
const formatReservationDate = date => {
    return dateWithoutMinutesAndSeconds(date);
};

/**
 * @param {BookedReservationInterface[]} bookedReservations
 * @return {boolean}
 */
const hasUserBookedReservationLessThanWeek = bookedReservations => {
    const reservationsLessThanWeek = bookedReservations.filter(bookedReservation => {
        const bookedReservationData = bookedReservation._doc;

        return dateLessThanWeek(new Date(bookedReservationData.createdAt));
    });

    return Boolean(reservationsLessThanWeek.length);
};

/**
 * @param {{ firstName: string, lastName: string, date: string }} inputs
 * @return {{ inputName: string, errorMessage: string }[]}
 */
const validateBookReservationInputs = inputs => {
    const { firstName, lastName, date } = inputs;
    const errors = [];

    const nameRegex = /^[a-z '-]+$/i;

    if (!firstName.match(nameRegex)) {
        errors.push({inputName: 'firstName', errorMessage: 'Wrong first name.'});
    }

    if (!lastName.match(nameRegex)) {
        errors.push({inputName: 'lastName', errorMessage: 'Wrong last name.'});
    }

    if (!isValidDate(date)) {
        errors.push({inputName: 'date', errorMessage: 'Wrong date.'});
    }

    return errors;
};

/**
 * @param {string | Date} date
 * @param {number[]} availableHours
 * @returns {ReservationInterface[]}
 */
const getReservations = (date, availableHours) => {
    return availableHours.map(hour => {
        const dateByHour = new Date(date).setHours(hour);

        return new Reservation({
            firstName: '',
            lastName: '',
            date: formatReservationDate(new Date(dateByHour))
        });
    });
};

/**
 * @param {BookedReservationInterface} reservation
 * @returns {TransformedBookedReservationInterface}
 */
const transformBookedReservation = reservation => {
    const reservationData = reservation._doc;

    return {
        ...reservationData,
        date: dateToString(reservationData.date),
        createdAt: dateToString(reservationData.createdAt),
        updatedAt: dateToString(reservationData.updatedAt)
    };
};

/**
 * @param {ReservationInterface[]} reservations
 * @returns {TransformedReservationInterface[]}
 */
const transformReservations = reservations => {
    return reservations.map(reservation => {
        const reservationData = reservation._doc;

        return {
            _id: reservationData._id,
            date: dateToString(reservationData.date),
            reserved: reservationData.firstName !== '' || !!reservationData.firstName,
            expired: new Date() > new Date(reservationData.date)
        };
    });
}

/**
 * @param {BookedReservationInterface[]} bookedReservations
 * @param {ReservationInterface[]} reservations
 * @returns {ReservationInterface[]}
 */
const mergeReservations = (bookedReservations, reservations) => {
    const mergedReservations = [];

    reservations.forEach((reservation) => {
        let mergedReservation = reservation;
        const reservationData = reservation._doc;

        bookedReservations.forEach(bookedReservation => {
            const bookedReservationData = bookedReservation._doc;

            if (
                new Date(reservationData.date).getHours() ===
                new Date(bookedReservationData.date).getHours()
            ) {
                mergedReservation = bookedReservation;
            }
        });

        mergedReservations.push(mergedReservation);
    });

    return mergedReservations;
};

exports.hasUserBookedReservationLessThanWeek = hasUserBookedReservationLessThanWeek;
exports.validateBookReservationInputs = validateBookReservationInputs;
exports.formatReservationDate = formatReservationDate;
exports.getReservations = getReservations;
exports.mergeReservations = mergeReservations;
exports.transformBookedReservation = transformBookedReservation;
exports.transformReservations = transformReservations;
