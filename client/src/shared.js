// @flow

export class ArticleObject {
  id: number;
  title: string;
  body: string;
  article_text: string;
  created_at: string;
  image: string;
  priority: number;
  category: string;

  constructor(
    id: number,
    title: string,
    body: string,
    text: string,
    date: string,
    image: string,
    priority: number,
    category: string
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.article_text = text;
    this.created_at = date;
    this.image = image;
    this.priority = priority;
    this.category = category;
  }
}
