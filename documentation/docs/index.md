# Welcome to the News API

The News API is made to be retrieve, create, update and delete various articles as well as their authors. It is organized around REST. The API has predictable resource-oriented URLs, returns JSON-encoded responses and uses standard HTTP response codes and verbs.

**Base URL**

```
http://lenhard-erwan.net:10300
```

## Object Types

The API works 3 different types of objects: `Author`, `Article` and `User`.

### Author

An `Author` is a person who wrote an article. It is composed of an id and a name.

Here is an example of an Author in the API:

```json
{
    "id": 1,
    "name": "John Smith"
}
```

### Article

An `Article` is a piece of news written by an author. It is composed of an id, a title, some content, a creation date, an update date and a reference to its author.

Here is an example of an Article in the API:

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Aenean euismod mauris eu elit. Nulla facilisi.",
    "creationDate": "2020-05-27T22:00:00.000Z",
    "updateDate": "2021-02-14T23:00:00.000Z",
    "author": {
        "id": 1,
        "name": "John Smith"
    }
}
```
### User

A `User` is a someone who registered in the API, and has access to it. It is composed of a username and a password (all passwords are hashed before being stored in the database).

Here is an example of a User in the API:

```json
{
  "username": "test",
  "password": "$2y$10$hDqUUU52uWHrzD3Wtj2BBeYmrBeknS4SIcOI5qDzO32qkEua3Sm46"
}
```
