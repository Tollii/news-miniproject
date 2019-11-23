//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card } from 'react-bootstrap';
import { Row, Column, ButtonSuccess, ButtonDanger } from './widgets';
import { createHashHistory } from 'history';
import { articleService } from './service';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
type htmlInput = SyntheticInputEvent<HTMLInputElement>;

export class PreviewArticle extends Component<{ id: number, title: string, body: string, image: string }> {
  render() {
    return (
      <div>
        <Card style={{ width: '25rem' }} className="card-img-top">
          <Card.Img variant="top" src={this.props.image} alt="" />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>{this.props.body}</Card.Text>
          </Card.Body>
          <a href={'/#/article/' + this.props.id} className="btn btn-primary">
            Read more
          </a>
        </Card>
      </div>
    );
  }
}
export class Article extends Component<{ match: { params: { id: number } } }> {
  title: string = '';
  body: string = '';
  article_text: string = '';
  created_at: string = '';
  image: string = '';
  priority: number = -1;
  category: string = 'test';

  render() {
    return (
      <div className="articleContainer">
        <h1>{this.title}</h1>
        <img src={this.image} alt="" width="50%" />
        <h4>{this.body}</h4>
        <div className="postDateArticle">{this.created_at}</div>
        <div className="postDateArticle">{this.category}</div>
        <div className="breadtext">{this.article_text}</div>
      </div>
    );
  }

  mounted() {
    articleService.getArticle(this.props.match.params.id).then(article => {
      this.title = article.title;
      this.body = article.summary;
      this.article_text = article.article_text;
      this.created_at = article.created_at;
      this.priority = article.priority;
      this.image = article.image;
      this.category = article.category;
    });
  }
}

export class ArticleEdit extends Component<{ match: { params: { id: number } } }> {
  title: string = '';
  body: string = '';
  article_text: string = '';
  image: string = '';
  category: string = '';
  priority: number = -1;
  form = null;

  render() {
    return (
      <Card title={'Editing ' + this.title}>
        <form ref={e => (this.form = e)}>
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
              <input type="text" value={this.body} onChange={(event: htmlInput) => (this.body = event.target.value)} />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Article text</Column>
            <Column width={4}>
              <textarea
                value={this.article_text}
                rows={5}
                cols={65}
                onChange={(event: htmlInput) => (this.article_text = event.target.value)}
              >
                {this.article_text}
              </textarea>
            </Column>
          </Row>
          <Row>
            <Column width={2}>Image URL</Column>
            <Column width={4}>
              <input
                type="text"
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
              <br />
              <ButtonSuccess onClick={this.save}>Save</ButtonSuccess>
              <ButtonDanger onClick={this.delete}>Delete</ButtonDanger>
            </Column>
          </Row>
        </form>
      </Card>
    );
  }

  mounted() {
    articleService.getArticle(this.props.match.params.id).then(article => {
      this.title = article.title;
      this.body = article.summary;
      this.article_text = article.article_text;
      this.image = article.image;
      this.category = article.category;
      this.priority = parseInt(article.priority);
    });
  }

  delete() {
    articleService.deleteArticle(this.props.match.params.id);
    history.push('/');
  }

  save() {
    let newCategory: string = '';
    let newPriority: string = '';
    let e = document.querySelector('#editCategorySelector');
    if (e instanceof HTMLSelectElement) newCategory = e.value;
    e = document.querySelector('#editPrioritySelector');
    if (e instanceof HTMLSelectElement) newPriority = e.value;

    if (newCategory === 'Select category' || newPriority === 'Select priority') {
      alert('Choose a category and a priority');
      return;
    }

    articleService.updateArticle(this.props.match.params.id, {
      title: this.title,
      body: this.body,
      article_text: this.article_text,
      image: this.image,
      priority: newPriority,
      category: newCategory
    });

    history.push('/article/' + this.props.match.params.id);
  }
}
