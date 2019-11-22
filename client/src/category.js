
import * as React from 'react';
import { Component } from 'react-simplified';
import { Card } from 'react-bootstrap';
import { Row, Column, ButtonSuccess } from './widgets';
import { createHashHistory } from 'history';
import { articleService } from "./service";
import {ArticleObject} from "./shared";
import {Article, PreviewArticle} from "./article";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
type htmlInput = SyntheticInputEvent<HTMLInputElement>;


export class War extends Component {
    articles: ArticleObject[] = [];
    temp: ArticleObject[] = [];


    constructor(props: React.Component) {
        super(props);

        articleService.getArticles().then(data => {
            this.temp = data.map( e =>
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
            this.articles = this.temp.filter(e => e.category === "war" ||  e.category === "War");
        });
    }

    render() {
        return(
            <div className="contentGrid">
                {this.articles.map(e => (
                    <PreviewArticle key={e.id} id={e.id} title={e.title} text={e.body} image={e.image} date={e.date} />
                ))}
            </div>
        );
    }
}

export class Other extends Component {
    articles: ArticleObject[] = [];
    temp: ArticleObject[] = [];

    constructor(props: React.Component) {
        super(props);

        articleService.getArticles().then(data => {
            this.temp = data.map( e =>
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
            this.articles = this.temp.filter(e => e.category === "other" || e.category === "Other" );
        });
    }

    render() {
        return(
          <div>
            <div className="contentGrid">
                {this.articles.map(e => (
                    <PreviewArticle key={e.id} id={e.id} title={e.title} text={e.body} image={e.image} date={e.date} />
                ))}
            </div>
        </div>
        );
    }
}

export class Ting extends Component {
    articles: ArticleObject[] = [];
    temp: ArticleObject[] = [];

    constructor(props: React.Component) {
        super(props);

        articleService.getArticles().then(data => {
            this.temp = data.map( e =>
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
            this.articles = this.temp.filter(e => e.category === "ting");
        });
    }
    render() {
        return(
            <div className="contentGrid">
                {this.articles.map(e => (
                    <PreviewArticle key={e.id} id={e.id} title={e.title} text={e.body} image={e.image} date={e.date} />
                ))}
            </div>
        );
    }
}