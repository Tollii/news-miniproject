// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ArticleObject } from './shared';
import { articleService } from './service';
import { ButtonDanger } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class Edit extends Component {
  articles: ArticleObject[] = [];

  render() {
    return (
      <div className="row">
        {this.articles.map(e => (
          <div className="card-img-edit" id={e.id}>
            <div className="col-md-7 ">
              <a href="#" className="">
                <img className="img-fluid rounded mb-3 mb-md-0 w-50" src={e.image} alt="" />
              </a>
            </div>
            <div className="col-md-5">
              <h3>{e.title}</h3>
              <p>{e.body}</p>
              <a className="btn btn-primary" href={'/#/article/' + e.id + '/edit'}>
                Edit Article
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }

  mounted() {
    articleService.getArticles().then(data => {
      this.articles = data.map(
        e =>
          new ArticleObject(e.article_id, e.title, e.summary, e.article_text, e.created_at, e.image, e.priority, 'war')
      );
    });
  }
}
