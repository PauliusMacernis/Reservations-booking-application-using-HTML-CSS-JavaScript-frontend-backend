/**
 * @param {Date} date
 * @returns {boolean}
 */
exports.dateLessThanWeek = (date) => {
    const WEEK = 1000 * 60 * 60 * 24 * 7;

    const weekAgo = Date.now() - WEEK;


    return date > weekAgo;
};

/**
 * @param {string} date
 * @returns {string}
 */
exports.dateToString = date => new Date(date).toISOString();

/**
 * @param {Date} date
 * @return {Date}
 */
exports.dateWithoutMinutesAndSeconds = date => {
    const newDate = new Date(date);

    newDate.setMinutes(0);
    newDate.setSeconds(0);

    return newDate;
};

/**
 * @param {string} date
 * @returns {boolean}
 */
exports.isValidDate = date => {
    const timestamp = Date.parse(date);

    return !isNaN(timestamp);
};
