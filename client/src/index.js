// @flow
/* eslint eqeqeq: "off" */

import ReactDOM from 'react-dom';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Header } from './header';
import { PreviewArticle, ArticleEdit, Article } from './article';
import { ArticleObject } from './shared';
import { New } from './new';
import { Edit } from './edit';
import { articleService } from './service';
import { Category } from './category';

export class Home extends Component<{ body: string }> {
  articles: ArticleObject[] = [];
  articlesPriority: ArticleObject[] = [];

  render() {
    return (
      <div>
        <div className="contentContainer">
          <div className="contentGrid">
            {this.articlesPriority.map(e => (
              <PreviewArticle key={e.id} id={e.id} title={e.title} body={e.body} image={e.image} date={e.created_at} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    articleService.getArticles().then(data => {
      this.articles = data.map(
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
      this.articlesPriority = this.articles.filter(e => e.priority === 1);
    });
  }
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.render(
    <HashRouter>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/article/:id" component={Article} />
        <Route exact path="/article/:id/edit" component={ArticleEdit} />
        <Route exact path="/new" component={New} />
        <Route exact path="/edit" component={Edit} />
        <Route exact path="/war" component={() => <Category category="War" />} />
        <Route exact path="/ting" component={() => <Category category="Ting" />} />
        <Route exact path="/other" component={() => <Category category="Other" />} />
      </div>
    </HashRouter>,
    root
  );
}
