const Reservation = require('../../models/reservation');
const { capitalizeString } = require('../../helpers/string');

const {
    getReservations,
    validateBookReservationInputs,
    formatReservationDate,
    hasUserBookedReservationLessThanWeek,
    mergeReservations,
    transformBookedReservation,
    transformReservations
} = require('./utils');

const AVAILABLE_HOURS = [
    8, 9, 10, 11, 13, 14, 15, 16, 17
];

module.exports = {
    /**
     * @param {*} args
     * @return {Promise<TransformedBookedReservationInterface>}
     */
    bookReservation: async (args) => {
        try {
            let { firstName, lastName, date } = args['reservationInput'];
            firstName = capitalizeString(firstName);
            lastName = capitalizeString(lastName);

            const inputErrors = validateBookReservationInputs({ firstName, lastName, date });

            if (inputErrors.length) {
                return Promise.reject(Error(inputErrors[0].errorMessage));
            }

            const formattedDate = formatReservationDate(date);

            if (formattedDate <= new Date()) {
                return Promise.reject(Error('Reservation expired'));
            }

            const userPreviousReservations = await Reservation.find({
                firstName,
                lastName
            });

            if (hasUserBookedReservationLessThanWeek(userPreviousReservations)) {
                return Promise.reject(Error('Only one reservation per week is possible'));
            }

            const existingReservationByDate = await Reservation.findOne({ date: formattedDate });

            if (existingReservationByDate) {
                return Promise.reject(Error('The reservation is not available at the selected time'));
            }

            const reservation = await new Reservation({
                firstName,
                lastName,
                date: formattedDate
            });

            const bookedReservation = await reservation.save();

            return transformBookedReservation(bookedReservation);
        } catch (error) {
            throw error;
        }
    },

    /**
     * @param {*} args
     * @return {Promise<boolean>}
     */
    cancelReservation: async (args) => {
        try {
            const { reservationId } = args;
            const reservation = await Reservation.findById(reservationId);

            if (!reservation) return Promise.reject(Error('Reservation doesn\'t exist'));

            await Reservation.deleteOne({ _id: reservationId });

            return true;
        } catch (error) {
            throw error
        }
    },

    /**
     * @param {string} date
     * @return {Promise<TransformedReservationInterface[]>}
     */
    reservations: async ({ date }) => {
        try {
            const bookedReservations = await Reservation.find({
                date: {
                    $gte: new Date(new Date(date).setHours(0, 0, 0)),
                    $lt:  new Date(new Date(date).setHours(23, 59, 59))
                }
            });

            const reservations = getReservations(date, AVAILABLE_HOURS);
            const mergedReservations = mergeReservations(bookedReservations, reservations);

            return transformReservations(mergedReservations);
        } catch (error) {
            throw error;
        }
    }
};
