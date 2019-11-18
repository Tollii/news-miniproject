import * as React from 'react';
import { Component } from 'react-simplified';
import { Nav, Navbar } from 'react-bootstrap';

export class Header extends Component {
  render() {
    return (
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
    );
  }
}
