import config from '../config/config.js';
import { DB } from '../config/DB.js';
import { Author } from '../models/Author.js'

export class AuthorDAO {

    // get all the authors
    async getAll() {
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + config.SCHEMA + '"."author" ORDER BY id ASC',
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows) {
            data = [];
            result.rows.forEach((row) => {
                data.push(new Author(row.id, row.name))
            });
        } else {
            data = null;
        }
        return data;
    }

    // get one author
    async get(id) {
        const client = await DB.open();
        const query = {
        text: 'SELECT * FROM "' + config.SCHEMA + '"."author" WHERE id=$1 ORDER BY id ASC',
        values: [id],
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
             data = new Author(result.rows[0].id, result.rows[0].name)
        } else {
            data = null;
        }
        return data;
    }

    // add a new author
    async add(name) {
        const client = await DB.open();
        const query = {
            text: 'INSERT INTO "' + config.SCHEMA + '"."author"(name) VALUES ($1) RETURNING *',
            values: [name],
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            data = new Author(result.rows[0].id, result.rows[0].name)
        } else {
           data = null;
        }
        return data;
    }

    // updates an author
    async update(author) {
        let data = null;
        if (await this.get(author.getId())) {
            const client = await DB.open();
            const query = {
            text: 'UPDATE "' + config.SCHEMA + '"."author" SET name=$2 WHERE id=$1 RETURNING *',
            values: [author.getId(), author.getName()],
            }
            const result = await client.query(query);
            if(result && result.rows && result.rows[0]) {
                data = new Author(result.rows[0].id, result.rows[0].name)
            }
        }
        return data;
    }

    // removes an author
    async remove(authorId) {
        let data = null;
        const client = await DB.open();
        const query = {
        text: 'DELETE FROM "' + config.SCHEMA + '"."author" WHERE id=$1 RETURNING *',
        values: [authorId],
        }
        const result = await client.query(query);
        if(result && result.rows && result.rows[0]) {
            data = new Author(result.rows[0].id, result.rows[0].name)
        }
        return data;
    }

}
