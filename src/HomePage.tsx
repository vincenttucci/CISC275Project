import React, { useState } from 'react';
import { Navbar, Nav, Container, FormControl,Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type HomePageProps = {navigateTo: (page: string) => void;

};

const HomePage: React.FC<HomePageProps> = ({navigateTo}) => {
    const [search, setSearch] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Searching for: ${search}`);
      };

    return (
        <>
            {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Career Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ marginTop: "20px" }}>
        <h4>Search for something:</h4>
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="searchInput">
            <FormControl
              type="text"
              placeholder="Enter search term"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" type="submit" className="mt-2">
            Search
          </Button>
        </Form>
      </div>


      {/* Page Content */}
      <Container className="mt-4">
        <h2>Welcome to the Home Page</h2>
        <p>This is where your content will go!</p>
      </Container>
    </>
  );
};

export default HomePage;