import pg from 'pg';
import config from './config.js';

export class DB {
    static async open() {
        if (DB.client == null) {
            try {
                const pool = new pg.Pool({
                    user: config.USER,
                    password: config.PASSWORD,
                    database: config.DBNAME,
                    host: config.DBHOST,
                    port: config.DBPORT
                });
                DB.client = await pool.connect();
                const query1 = `
                    CREATE TABLE IF NOT EXISTS ${config.SCHEMA}.author (
                        id SERIAL, name VARCHAR(128), 
                        PRIMARY KEY(id)
                    );
                    CREATE TABLE IF NOT EXISTS ${config.SCHEMA}.user (
                        name VARCHAR(64), 
                        password VARCHAR(64), 
                        PRIMARY KEY(name)
                    );
                `;
                await DB.client.query(query1);
                const query2 = `
                    CREATE TABLE IF NOT EXISTS ${config.SCHEMA}.article (
                        id SERIAL, title VARCHAR(300), 
                        content VARCHAR(20000), 
                        creation_date DATE, 
                        update_date DATE, 
                        author INTEGER, 
                        PRIMARY KEY(id), 
                        FOREIGN KEY(author) REFERENCES ${config.SCHEMA}.author(id)
                    );

                `;
                await DB.client.query(query2);
            } catch (err) {
                console.error(err);
                console.error("Exit application...");
                process.exit(-1);
            }
        }
        return DB.client;
    }
}
