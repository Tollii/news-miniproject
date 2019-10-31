import axios from 'axios';

export class PlaceholderArticle {
    constructor(id: Number, title: String, body: String, text: String, date: String, image: String, priority: Number, category: String){
        this.id = id;
        this.title = title;
        this.body = body;
        this.text = text;
        this.date = date;
        this.image = image;
        this.priority = priority;
        this.category = category;
    }

}



