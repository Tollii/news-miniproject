import * as React from 'react';
import { Component } from 'react-simplified';
import { articleService } from './service';
import { ArticleObject } from './shared';
import { PreviewArticle } from './article';

export class Category extends Component<{ category: string }> {
  articles: ArticleObject[] = [];
  temp: ArticleObject[] = [];

  constructor(props: { category: string }) {
    super(props);

    articleService.getArticles().then(data => {
      this.temp = data.map(
        e =>
          new ArticleObject(
            e.article_id,
            e.title,
            e.summary,
            e.article_text,
            e.created_at,
            e.image,
            e.priority,
            e.category
          )
      );
      this.articles = this.temp.filter(e => e.category === this.props.category);
    });
  }
  render() {
    return (
      <div className="contentContainer">
        <div className="contentGrid">
          {this.articles.map(e => (
            <PreviewArticle key={e.id} id={e.id} title={e.title} body={e.body} image={e.image} date={e.created_at} />
          ))}
        </div>
      </div>
    );
  }
}
