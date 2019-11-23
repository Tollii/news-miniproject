// @flow

import * as React from 'react';
import axios from 'axios';

class ArticleService {
  newPosts = false;

  getArticles() {
    return axios.get('http://localhost:4000/articles').then(res => res.data);
  }

  getArticle(id: number) {
    return axios.get('http://localhost:4000/articles/' + id).then(res => res.data[0]);
  }

  updateArticle(id: number, json: Object) {
    axios
      .put('http://localhost:4000/articles/' + id, {
        title: json.title,
        summary: json.body,
        article_text: json.article_text,
        image: json.image,
        priority: json.priority,
        category: json.category
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  deleteArticle(id: number) {
    axios.delete('http://localhost:4000/articles/' + id, { params: { id: id } }).then(res => {
      console.log(res);
    });
  }

  createArticle(json: Object) {
    axios
      .post('http://localhost:4000/articles', {
        title: json.title,
        summary: json.body,
        article_text: json.text,
        image: json.image,
        priority: json.priority,
        category: json.category
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }
}

export let articleService = new ArticleService();
