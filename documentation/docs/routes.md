# Routes

You can use the following API commands to retrieve data.

## Routes List

| GET           | POST      | PUT           | DELETE        |
| ------------- | --------- | ------------- | ------------- |
| /articles     | /register | /articles/:id | /articles/:id |
| /articles/:id | /login    | /authors/:id  | /authors/:id  |
| /authors      | /articles |               |               |
| /authors/:id  | /authors  |               |               |

## Routes Detail

---

### /register `POST`

Allows a user to create an account.

**Request Content**

```json
{
  "username": "<username>",
  "password": "<password>"
}
```

**Response**

```
HTTP 500 Status Code
```

---

### /login `POST`

**Request Content**

```json
{
  "username": "<username>",
  "password": "<password>"
}
```

**Response**

```json
{
  "token": "<token>"
}
```

---

### /articles `GET`

Gets all the articles.

**Response**

```json
[
  {
    "id": "<article id>",
    "title": "article title>",
    "content": "<article content>",
    "creationDate": "<article creation date>",
    "updateDate": "<article update date>",
    "author": {
      "id": "<article author id>",
      "name": "<article author name>"
    }
  },
  { "..." }
]
```

---

### /articles/:id `GET`

Gets the specified article.

**Response**

```json
{
  "id": "<article id>",
  "title": "article title>",
  "content": "<article content>",
  "creationDate": "<article creation date>",
  "updateDate": "<article update date>",
  "author": {
    "id": "<article author id>",
    "name": "<article author name>"
  }
}
```

---

### /authors `GET`

Gets all the authors.

**Response**

```json
[
  {
    "id": "<author id>",
    "name": "<author name>"
  },
  { "..." }
]
```

---

### /authors/:id `GET`

Gets the specified author.

**Response**

```json
{
  "id": "<author id>",
  "name": "<author name>"
}
```

---

### /articles `POST`

Creates a new article.

**Request Content**

```json
{
  "title": "<new article title>",
  "content": "<new article content>",
  "author": {
    "id": "<new article author id>",
    "name": "<new article author name>"
  }
}
```

**Response**

```json
{
  "id": "<new article id>",
  "title": "<new article title>",
  "content": "<new article content>",
  "creationDate": "<new article creation date>",
  "updateDate": "<new article update date>",
  "author": {
    "id": "<new article author id>",
    "name": "new article author name>"
  }
}
```

---

### /authors `POST`

Creates a new author.

**Request Content**

```json
{
  "name": "<new name>"
}
```

**Response**

```json
{
  "id": "<new author id>",
  "name": "<new author name>"
}
```

---

### /articles/:id `PUT`

Modifies an existing article.

**Request Content**

```json
{
  "title": "<updated title>",
  "content": "<updated content>",
  "creationDate": "<creation date>",
  "updateDate": "<updated update date>",
  "author": {
    "id": "<author id>"
  }
}
```

**Response**

```json
{
  "id": "<updated article id>",
  "title": "<updated article title>",
  "content": "<updated article content>",
  "creationDate": "<updated article creation date>",
  "updateDate": "<updated article update date>",
  "author": {
    "id": "<updated article author id>",
    "name": "<updated article author name>"
  }
}
```

---

### /authors/:id `PUT`

Modifies an existing author.

**Request Content**

```json
{
  "name": "<updated name>"
}
```

**Response**

```json
{
  "id": "<updated author id>",
  "name": "<updated author name>"
}
```

---

### /articles/:id `DELETE`

Deletes an article.

**Response**

```json
{
  "id": "<deleted article id>",
  "title": "<deleted article title>",
  "content": "<deleted article content>",
  "creationDate": "<deleted article creation date>",
  "updateDate": "<deleted article update date>",
  "author": {
    "id": "<deleted article author id>",
    "name": "<deleted article author name>"
  }
}
```

---

### /authors/:id `DELETE`

Deletes an author.

**Response**

```json
{
  "id": "<deleted author id>",
  "name": "<deleted author name>"
}
```
