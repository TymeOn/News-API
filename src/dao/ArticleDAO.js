import config from '../config/config.js';
import { DB } from '../config/DB.js';
import { Article } from '../models/Article.js';
import { AuthorDAO } from './AuthorDAO.js'

export class ArticleDAO {

    // get all the articles
    async getAll() {
        const client = await DB.open();
        const query = {
            text: 'SELECT * FROM "' + config.SCHEMA + '"."article" ORDER BY id ASC',
        };
        const result = await client.query(query);
        let data = [];
        if(result && result.rows) {
            const authorDAO = new AuthorDAO();
            for (const row of result.rows) {
                const a = await authorDAO.get(row.author);
                const article = new Article(
                    row.id, 
                    row.title,
                    row.content,
                    row.creation_date,
                    row.update_date,
                    a,
                );
                data.push(article);
            }
        } else {
            data = null;
        }
        return data;
    }

    // get one article
    async get(id) {
        let data = null;
        const client = await DB.open();
        const query = {
        text: 'SELECT * FROM "' + config.SCHEMA + '"."article" WHERE id=$1 ORDER BY id ASC',
        values: [id],
        }
        const result = await client.query(query);
        if(result && result.rows && result.rows[0]) {
            const authorDAO = new AuthorDAO();
            const a = await authorDAO.get(result.rows[0].author);
            data = new Article(
                result.rows[0].id, 
                result.rows[0].title,
                result.rows[0].content,
                result.rows[0].creation_date,
                result.rows[0].update_date,
                a,
            );
        }
        return data;
    }

    // add a new article
    async add(title, content, author) {
        const client = await DB.open();
        const query = {
            text: 'INSERT INTO "' + config.SCHEMA + '"."article"(title, content, creation_date, update_date, author) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [title, content, new Date(), new Date(), author.getId()],
        };
        const result = await client.query(query);
        let data;
        if(result && result.rows && result.rows[0]) {
            const authorDAO = new AuthorDAO();
            const a = await authorDAO.get(result.rows[0].author);
            data = new Article(
                result.rows[0].id,
                result.rows[0].title,
                result.rows[0].content,
                result.rows[0].creation_date,
                result.rows[0].update_date,
                a,
            );
        } else {
           data = null;
        }
        return data;
    }

    // updates an article
    async update(article) {
        let data = null;
        const authorDAO = new AuthorDAO();
        if (await this.get(article.getId())) {
            const client = await DB.open();
            const query = {
            text: 'UPDATE "' + config.SCHEMA + '"."article" SET title=$2, content=$3, creation_date=$4, update_date=$5, author=$6 WHERE id=$1 RETURNING *',
            values: [article.getId(), article.getTitle(), article.getContent(), article.getCreationDate(), new Date(), article.getAuthor()],
            }
            const result = await client.query(query);
            if(result && result.rows && result.rows[0]) {
                const a = await authorDAO.get(result.rows[0].author);
                data = new Article(
                    result.rows[0].id,
                    result.rows[0].title,
                    result.rows[0].content,
                    result.rows[0].creation_date,
                    result.rows[0].update_date,
                    a,
                );
            }
        }
        return data;
    }

    // removes an article
    async remove(articleId) {
        let data = null;
        const client = await DB.open();
        const query = {
        text: 'DELETE FROM "' + config.SCHEMA + '"."article" WHERE id=$1 RETURNING *',
        values: [articleId],
        }
        const result = await client.query(query);
        if(result && result.rows && result.rows[0]) {
            const authorDAO = new AuthorDAO();
            const a = await authorDAO.get(result.rows[0].author);
            data = new Article(
                result.rows[0].id,
                result.rows[0].title,
                result.rows[0].content,
                result.rows[0].creation_date,
                result.rows[0].update_date,
                a,
            );
        }
        return data;
    }

}
