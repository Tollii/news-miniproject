import * as React from 'react';
import { Component } from 'react-simplified';
import { Nav, Navbar } from 'react-bootstrap';
import io from "socket.io-client";
import { articleService } from "./service";
import {ArticleObject} from "./shared";

export class Header extends Component {
  render() {
    return (
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">iPhone 4</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className="control-link" href="/">Home</Nav.Link>
                  <Nav.Link className="control-link" href="#edit">Edit</Nav.Link>
                <Nav.Link className="control-link" href="#new">New Article</Nav.Link>
              </Nav>
                <Nav className="mr-auto">
                    <Nav.Link href="#war">War</Nav.Link>
                    <Nav.Link href="#ting">??????</Nav.Link>
                    <Nav.Link href="#other">Other</Nav.Link>
                </Nav>

            </Navbar.Collapse>

          </Navbar>
            <LiveFeed/>
        </div>

    );
  }
}

class LiveFeed extends Component {
    value : number= 60;
    articles = [];

    constructor(props) {
        super(props);

        const socket = io('http://localhost:4000');
        socket.on('connect', function(){console.log("connected")});
        socket.on('event', function(data){});
        socket.on('newArticle', e => {
            console.log("newArticle");
            articleService.newPosts = true;
        });
        socket.on('disconnect', function(){});
    }

    render(){
        return(
            <div>
                <div className="rollingNews">
                    <div id="rollText">
                        {this.articles.map(e => `${e.title} - ${e.created_at.substring(0, 10)} ~ `)}
                    </div>
                </div>
            </div>
        )
    }
    mounted() : void{
        setInterval(a => this.animateLiveFeed(),15);
        articleService.getArticles().then(data => {
            this.articles = data.map( e =>
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
        });
    }

    animateLiveFeed() : void{

        if(this.value<-70){
            this.value = 60;
        }

        let rollingNews : HTMLElement  = document.querySelector("#rollText");
        rollingNews.style.transform = `translateX(${this.value}%)`;
        this.value -= 0.05;

    }






}
