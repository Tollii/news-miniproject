// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card } from 'react-bootstrap';
import { Row, Column, ButtonSuccess } from './widgets';
import { createHashHistory } from 'history';
import { articleService } from "./service";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
type htmlInput = SyntheticInputEvent<HTMLInputElement>;

export class New extends Component {
  title = '';
  body = '';
  article_text = '';
  image = '';
  category = '';
  form = null;

  render() {
    return (
      <Card title={'New article'}>
        <form ref={e => (this.form = e)}>
          <Row>
            <Column width={2}>Title</Column>
            <Column width={4}>
              <input type="text" onChange={(event: htmlInput) => (this.title = event.target.value)} />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Body</Column>
            <Column width={4}>
              <input type="text" onChange={(event: htmlInput) => (this.body = event.target.value)} />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Article text</Column>
            <Column width={4}>
              <textarea rows={5} cols={65} onChange={(event: htmlInput) => (this.article_text = event.target.value)} />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Image URL</Column>
            <Column width={4}>
              <input type="textarea" onChange={(event: htmlInput) => (this.image = event.target.value)} />
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
            </Column>
          </Row>
        </form>
      </Card>
    );
  }

  save() {

    let e = document.querySelector('#editCategorySelector');
    const newCategory = e instanceof HTMLSelectElement ? e.value : "";

    e = document.querySelector('#editPrioritySelector');
    let newPriority = e instanceof HTMLSelectElement ? e.value : "";

    if (newCategory === 'Select category' || newPriority === 'Select priority') {
      alert('Choose a category and a priority');
      return;
    }

    articleService.createArticle({
      "title": this.title,
      "body": this.body,
      "article_text": this.article_text,
      "image": this.image,
      "priority": newPriority,
      "category": newCategory
    });



    history.push('/');
  }
}
