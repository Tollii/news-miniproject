// @flow
/* eslint eqeqeq: "off" */

import ReactDOM from 'react-dom';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Component, sharedComponentData} from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, Card, Button, Row, Column } from './widgets';
import { Navbar, Nav, Col, Container } from 'react-bootstrap';
import { Header } from './header';
import Carousel from 'react-bootstrap/Carousel'
import { PreviewArticle, ArticleEdit } from './article';
import { createHashHistory } from 'history';
import { PlaceholderArticle } from './shared';
import { New } from './new';
import axios from "axios";
import { Article } from './article';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class Home extends Component {
    articles: PlaceholderArticle[] = [];
    articlesPriority: PlaceholderArticle[] = [];
    topArticle: PlaceholderArticle = '';


    constructor(props: React.Component){
        super(props);

        axios.get('http://localhost:4000/article').then(res => {
            const data = res.data;
            this.articles = data.map( e => new PlaceholderArticle(e.article_id, e.title, e.summary, e.article_text, e.created_at, e.image, e.priority, 'war'));
            this.articlesPriority = this.articles.filter( e => e.priority == 2);
            this.topArticle = this.articlesPriority[this.articlesPriority.length - 1];
        });

    }

    render(){
        return(
            <div>
                <div className='contentContainer'>
                    <Carousel>
                        {this.articlesPriority.map(e => (

                            <Carousel.Item>
                                <img
                                    className="d-block w-50"
                                    src={e.image}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h2>{e.title}</h2>
                                    <h4>{e.body}</h4>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                    <div className='contentGrid'>
                        {this.articles.map( e => (
                            <PreviewArticle key={e.id}  id={e.id} title={e.title} text={e.body} image={e.image} date={e.date} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


const root = document.getElementById('root');
if (root){
    ReactDOM.render(
        <HashRouter>
            <div>
            <Header/>
                <Route exact path="/" component={ Home } />
                <Route exact path="/article/:id" component={ Article }/>
                <Route exact path="/article/:id/edit" component={ ArticleEdit }/>
                <Route exact path="/new" component={ New }/>
            </div>
        </HashRouter>,
        root
    );
}



