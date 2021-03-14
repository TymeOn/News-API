import config from '../config/config.js';
import { DB } from '../config/DB.js';
import { User } from '../models/User.js'

export class UserDAO {

    // register a new user in the DB
    async register(user) {
        const client = await DB.open();
            const query = {
            text: 'INSERT INTO "' + config.SCHEMA + '"."user"(username, password) VALUES ($1, $2) RETURNING *',
            values: [user.getUsername(), user.getPassword()],
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = new User(result.rows[0].username, result.rows[0].password)
        } else {
            data = null;
        }
        return data;
    }

    // check if the user exists in the DB
    async getHashedPassword(username) {
        const client = await DB.open();
        const query = {
            text: 'SELECT password FROM "' + config.SCHEMA + '"."user" WHERE username=$1',
            values: [username]
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = result.rows[0].password;
        } else {
            data = null;
        }
        return data;
    }

}
