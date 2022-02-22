const reservationResolver = require('./reservation');

const rootResolver = {
    ...reservationResolver
};

module.exports = rootResolver;
