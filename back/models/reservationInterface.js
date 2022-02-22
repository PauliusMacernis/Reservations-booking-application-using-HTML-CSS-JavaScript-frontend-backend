/**
 * @interface BookedReservationInterface
 * @property {{
 *     _id: string
 *     createdAt: string
 *     date: string
 *     firstName: string
 *     lastName: string
 *     updatedAt: string
 * }} _doc
 */

/**
 * @interface TransformedBookedReservationInterface
 * @property {string} _id
 * @property {string} createdAt
 * @property {string} date
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} updatedAt
 */

/**
 * @interface ReservationInterface
 * @property {{
 *     _id: string
 *     date: string
 *     firstName: string,
 *     lastName: string
 * }} _doc
 */

/**
 * @interface TransformedReservationInterface
 * @property {string} _id
 * @property {string} date
 * @property {boolean} reserved
 * @property {boolean} expired
 */
