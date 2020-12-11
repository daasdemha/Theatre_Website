
/** @module Cart */

import sqlite from 'sqlite-async'

const saltRounds = 10

/**
 * Cart
 * ES6 module that handles Cart.
 */
class Cart {
    /**
   * Create an account object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
    constructor(dbName = ':memory:') {
        return (async () => {
            this.db = await sqlite.open(dbName)
            return this
        })()
    }

    /**
     * Get existing cart
     */
    async getCartAgainstUser(userId, performanceId, performanceSUbId) {


        let sql = ``;
        if (performanceId) {
            sql = `SELECT count(cart_id) AS count FROM carts WHERE user_id="${userId}" and performance_id="${performanceId}";`
        } else {
            sql = `SELECT count(cart_id) AS count FROM carts WHERE user_id="${userId}";`
        }

        console.log('<Cart count query ', sql)
        const records = await this.db.get(sql)
        return records.count;

    }

    /**
 * add perfromance to  cart
 */
    async addPerformanceToCart(userId, performanceId, performanceSUbId, cost) {

        let sql = `INSERT INTO carts(user_id, performance_id, performance_sub_id, cost) VALUES("${userId}", "${performanceId}" , "${performanceSUbId}", "${cost}")`
        await this.db.run(sql)
        let countSql = `SELECT count(cart_id) AS count FROM carts WHERE user_id="${userId}" and performance_id="${performanceId}" and performance_sub_id="${performanceSUbId}";`
        const records = await this.db.get(countSql)

        if (records.count > 0) {
            return records.count
        } else { throw new Error(`Performance already added in cart`) }

    }

    /**
* get  cart listing
*/
    async cartListing(userId) {
        let sql = `select * from carts 
        inner join performances on performances.performance_id = carts.performance_id 
        inner join performance_details on performances.performance_id = performance_details.id
        where user_id="${userId}";`
        const records = await this.db.all(sql)
        return records
    }

    /**
* delete  cart 
*/
    async deleteCart(userId, cartId) {

        let sql;
        if (cartId) {
            sql = `DELETE FROM carts WHERE cart_id="${cartId}" AND user_id="${userId}";`
        } else {
            sql = `DELETE FROM carts WHERE user_id="${userId}";`
        }

        await this.db.run(sql)

        return true
    }





    async close() {
        await this.db.close()
    }
}

export default Cart
