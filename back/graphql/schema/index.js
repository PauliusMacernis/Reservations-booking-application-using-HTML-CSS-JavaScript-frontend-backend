const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    input ReservationInput {
        firstName: String!
        lastName: String!
        date: String!
    }
    
    type BookedReservation {
        _id: ID!
        firstName: String!
        lastName: String!
        date: String!
        createdAt: String!
        updatedAt: String!
    }
    
    type Reservation {
        _id: ID!
        date: String!
        reserved: Boolean!
        expired: Boolean!
    }
    
    type RootQuery {
        reservations(date: String!): [Reservation!]!
    }
    
    type RootMutation {
        bookReservation(reservationInput: ReservationInput): BookedReservation!
        cancelReservation(reservationId: ID!): Boolean!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
