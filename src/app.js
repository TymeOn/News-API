import { Article } from './models/Article.js';
import { Author } from './models/Author.js';
import { User } from './models/User.js';
import { ArticleDAO } from './dao/ArticleDAO.js'
import { AuthorDAO } from './dao/AuthorDAO.js';
import { UserDAO } from './dao/UserDAO.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from './config/config.js';


// SETUP
// -----

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const articleDAO = new ArticleDAO();
const authorDAO = new AuthorDAO();
const userDAO = new UserDAO();
const RESSOURCE_NOT_FOUND = "The requested ressource is not available."


// AUTHENTICATION MIDDLEWARE
// -------------------------

const authenticationMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};


// USER OPERATIONS
// ---------------

app.post('/register', async (req, res) => {
    try {
        const body = req.body;
        if (!body.username || !body.password) {
            return res.status(400).json({ message: 'Error. Please enter an username and a password' })
        }
        const tempUser = await userDAO.getHashedPassword(body.username);
        if(!tempUser) {
            bcrypt.hash(body.password, config.SALT_ROUNDS, async function(err, hash) {
                res.status(201).send(await userDAO.register(new User(body.username, hash)));
            }); 
        } else {
            res.status(500).send({ message: 'Error. This username is already taken' });
        }
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    } 
});

app.post('/login', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
        }
        const hashedPassword = await userDAO.getHashedPassword(req.body.username);
        if (!hashedPassword) {
            return res.status(400).json({ message: 'Error. Wrong login or password' })
        }
        bcrypt.compare(req.body.password, hashedPassword, (err, result) => {
            if (result) {
                const token = jwt.sign({data: req.body.username}, SECRET_KEY, {expiresIn: '1800s'});
                res.json({
                    token: token
                });
            } else {
                return res.status(400).json({ message: 'Error. Wrong password' })
            }
        });
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }  
});


// READ
// ----

app.get('/articles', authenticationMiddleware, async (req, res) => {
    try {
        res.send(await articleDAO.getAll());
    } catch (err) { 
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.get('/articles/:id', authenticationMiddleware, async (req, res) => {
    try {
        const data = await articleDAO.get(req.params.id);
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
    
});

app.get('/authors', authenticationMiddleware, async (req, res) => {
    try {
        res.send(await authorDAO.getAll());
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.get('/authors/:id', authenticationMiddleware, async (req, res) => {
    try {
        const data = await authorDAO.get(req.params.id);
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});


// CREATE
// ------

app.post('/articles', authenticationMiddleware, async (req, res) => {
    try {
        const body = req.body;
        res.status(201).send(await articleDAO.add(body.title, body.content, new Author(body.author.id, body.author.name)));
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.post('/authors', authenticationMiddleware, async (req, res) => {
    try {
        const body = req.body;
        res.status(201).send(await authorDAO.add(body.name));
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }  
});


// UPDATE
// ------

app.put('/articles/:id', authenticationMiddleware, async (req, res) => {
    try {
        const body = req.body;
        const data = await articleDAO.update(new Article(req.params.id, body.title, body.content, body.creationDate, body.updateDate, body.author.id));
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.put('/authors/:id', authenticationMiddleware, async (req, res) => {
    try {
        const body = req.body;
        const data = await authorDAO.update(new Author(req.params.id, body.name));
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});


// DELETE
// ------

app.delete('/articles/:id', authenticationMiddleware, async (req, res) => {
    try {
        const data = await articleDAO.remove(req.params.id);
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});

app.delete('/authors/:id', authenticationMiddleware, async (req, res) => {
    try {
        const data = await authorDAO.remove(req.params.id);
        data ? res.send(data) : res.status(404).send(RESSOURCE_NOT_FOUND);
    } catch (err) {
        console.log(err);
        res.status(500).send({errName: err.name, errMessage: err.message});
    }
});


// STARTUP
// -------

app.listen(config.PORT, () => {
    console.log('News-API running on port ' + config.PORT);
});
