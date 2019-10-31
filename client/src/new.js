// @flow

import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import {  Card } from 'react-bootstrap';
import { Row, Column, ButtonSuccess } from './widgets';
import { PlaceholderArticle } from './shared';
import { createHashHistory } from 'history';
import axios from 'axios';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
type htmlInput = SyntheticInputEvent<HTMLInputElement>;


export class New extends Component {
    title = '';
    body = '';
    text = '';
    date = 0;
    image = '';
    category = '';
    form = null;

    render() {
        return (
            <Card title={'New article' }>
                <form ref={e => (this.form = e)}>
                    <Row>
                        <Column width={2}>Title</Column>
                        <Column width={4}>
                            <input
                                type="text"
                                onChange={(event: htmlInput) => (this.title = event.target.value)}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={2}>Body</Column>
                        <Column width={4}>
                            <input
                                type="text"
                                onChange={(event: htmlInput) => (this.body = event.target.value)}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={2}>Article text</Column>
                        <Column width={4}>
                            <textarea
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
                                onChange={(event: htmlInput) => (this.date = event.target.value)}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={2}>Image URL</Column>
                        <Column width={4}>
                            <input
                                type="textarea"
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
                            <ButtonSuccess onClick={this.save}>Save</ButtonSuccess>
                        </Column>
                    </Row>
                </form>
            </Card>
        );
    }

    save(){

        let newCategory = document.querySelector('#editCategorySelector').value;
        let newPriority = document.querySelector('#editPrioritySelector').value;

        if(newCategory === 'Select category' || newPriority === 'Select priority'){
            alert('Choose a category and a priority');
            return;
        }
        axios.post('http://localhost:4000/article', {
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
