//@flow

import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { PlaceHolderArticle } from './shared';
import { Row, Column, ButtonSuccess } from './widgets';
import axios from 'axios';
import { createHashHistory } from 'history';
import {PlaceholderArticle} from "./shared";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
type htmlInput = SyntheticInputEvent<HTMLInputElement>;

export class PreviewArticle extends Component {
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={ this.props.image } alt="" />
                    <Card.Body>
                        <Card.Title>{ this.props.title }</Card.Title>
                        <Card.Text>{ this.props.body }</Card.Text>
                    </Card.Body>
                </Card>
                <div>
                    <NavLink  to={'/article/' + this.props.id}>
                        Read more
                    </NavLink>
                </div>
                <div>
                    <NavLink className='navEdit' to={'/article/' + this.props.id + '/edit'}>
                        Edit
                    </NavLink>
                </div>
            </div>
        );
    }
}

export class Article extends Component {
    title = '';
    summary = '';
    article_text = '';
    created_at = 0;
    image = '';
    category = '';
    priority = '';


    render() {
        return(
            <div className="articleContainer">
                <h1>{this.title}</h1>
                <img src={this.image} alt='' width="70%"/>
                <h4>{this.summary}</h4>
                <div className="postDateArticle">{this.created_at}</div>
                <div className="breadtext">{this.article_text}</div>
            </div>
        );
    }

    mounted() {
        let article = null;
        axios.get('http://localhost:4000/article/' + this.props.match.params.id).then(res => {
            const data = res.data[0];
            article = new PlaceholderArticle(data.article_id, data.title, data.summary, data.article_text, data.created_at, data.image, 1, 'war')

            if(!article){
                alert('Something went wrong :/')
                history.push('/');
            }

            this.title = article.title;
            this.summary = article.body;
            this.article_text = article.text;
            this.created_at = article.date;
            this.image = article.image;
        });



    }
}

export class ArticleEdit extends Component {
    title = '';
    body = '';
    text = '';
    date = 0;
    image = '';
    category = '';
    form = null;


    render() {
        return (
            <Card title={'Editing ' + this.title }>
                <form ref={e => (this.form = e) }>
                    <Row>
                        <Column width={2}>Title</Column>
                        <Column width={4}>
                            <input
                                type="text"
                                value={this.title}
                                onChange={(event: htmlInput) => (this.title = event.target.value)}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={2}>Body</Column>
                        <Column width={4}>
                            <input
                                type="text"
                                value={this.body}
                                onChange={(event: htmlInput) => (this.body = event.target.value)}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={2}>Article text</Column>
                        <Column width={4}>
                            <textarea
                                value={this.text}
                                rows={5}
                                cols={65}
                                onChange={(event: htmlInput) => (this.text = event.target.value)}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={2}>Date (YYYY-MM-DD)</Column>
                        <Column width={4}>
                            <input
                                type="text"
                                value={this.date}
                                onChange={(event: htmlInput) => (this.date = event.target.value)}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={2}>Image URL</Column>
                        <Column width={4}>
                            <input
                                type="textarea"
                                value={this.image}
                                onChange={(event: htmlInput) => (this.image = event.target.value)}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={2}>Category</Column>
                        <Column width={4}>
                            <select id="editCategorySelector">
                                <option>Select category</option>
                                <option>War</option>
                                <option>Other</option>
                            </select>
                        </Column>
                    </Row>
                    <Row>
                        <Column width={2}>Priority</Column>
                        <Column width={4}>
                            <select id="editPrioritySelector">
                                <option>Select priority</option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </Column>
                    </Row>
                    <Row>
                        <Column width={6}>
                            <br/>
                            <ButtonSuccess onClick={this.save} >Save</ButtonSuccess>
                        </Column>
                    </Row>
                </form>
            </Card>
        );
    }

    mounted(){
        let article = null;
        axios.get('http://localhost:4000/article/' + this.props.match.params.id).then( res => {

            const data = res.data[0];
            article = new PlaceholderArticle(data.article_id, data.title, data.summary, data.article_text, data.created_at, data.image, 1, 'war')

            this.title = article.title;
            this.body = article.body;
            this.text = article.text;
            this.image = article.image;
            this.category = article.category;
            this.priority = article.priority;
        });
    }

    save(){
        let article = null;
        axios.get('http://localhost:4000/article/' + this.props.match.params.id).then( res => {
            const data = res.data[0];
            article = new PlaceholderArticle(data.article_id, data.title, data.summary, data.article_text, data.created_at, data.image, 1, 'war')
        });

        let newCategory = document.querySelector('#editCategorySelector').value;
        let newPriority = document.querySelector('#editPrioritySelector').value;

        if(newCategory === 'Select category' || newPriority === 'Select priority'){
            alert('Choose a category and a priority');
            return;
        }
        axios.put('http://localhost:4000/article/' + this.props.match.params.id, {
            title: this.title,
            summary: this.body,
            article_text: this.text,
            image: this.image,
            priority: newPriority
        }).then(res => {
            console.log(res);
            console.log(res.data);
        });

        history.push('/');
    }
}
