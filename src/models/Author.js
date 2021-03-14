export class Author {
    
    constructor(_id, _name) {
        this.id = _id;
        this.name = _name;
    }

    // getters
    getId() { return this.id ;}
    getName() { return this.name; }

    // setters
    setId(_id) { this.id = _id; }
    setName(_name) { this.name = _name; }

}
