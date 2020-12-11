
/** @module Performances */

import sqlite from 'sqlite-async'

const saltRounds = 10

/**
 * Performances
 * ES6 module that handles Performances.
 */
class Performances {
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
     * Get performance Detail
     */
    async getPerformancesById(performanceId) {
        let sql = `select * from performances inner join productions on performances.production_id = productions.production_id where performances.performance_id=${performanceId};`
        const records = await this.db.get(sql)
        return records
    }

    /**
 * Get performance Detail By Id
 */
    async getAllPerformancesBySinglePerformanceId(performanceId) {
        let sql = `select * from performance_details  where performance_id=${performanceId};`
        const records = await this.db.all(sql)
        return records
    }


    /**
     * Get List of all performances currentyly played
     */
    async getPerformancesListing(options) {
        let sql = `select * from performances inner join productions on performances.production_id = productions.production_id where performances.status='active';`
        const records = await this.db.all(sql)
        return records
    }

    /**
     * Get List of all production plans
     */
    async getProductionPlansListing(options) {
        let sql = `select * from production_plans as pp inner join productions on pp.production_id = productions.production_id 
        inner join performances on performances.performance_id = pp.performance_id;`
        const records = await this.db.all(sql);
        return records
    }


    async close() {
        await this.db.close()
    }
}

export default Performances
