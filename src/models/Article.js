export class Article {
    
    constructor(_id, _title, _content, _creationDate, _updateDate, _author) {
        this.id = _id;
        this.title = _title;
        this.content = _content;
        this.creationDate = _creationDate;
        this.updateDate = _updateDate;
        this.author = _author;
    }

    // getters
    getId() { return this.id }
    getTitle() { return this.title; }
    getContent() { return this.content; }
    getCreationDate() { return this.creationDate; }
    getUpdateDate() { return this.updateDate; }
    getAuthor() { return this.author; }

    // setters
    setId(_id) { this.id = _id; }
    setTitle(_title) { this.title = _title; }
    setContent(_content) { this.content = _content; }
    setCreationDate(_creationDate) { this.creationDate = _creationDate; }
    setUpdateDate(_updateDate) { this.updateDate = _updateDate; }
    setAuthor(_author) { this.author = _author; }

}
