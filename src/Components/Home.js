import React, { useEffect, useState } from "react";
import BooksApi from "../API/BooksApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Home() {
    const [currentRead, setcurrentRead] = useState([]);
    const [wantToRead, setwantToRead] = useState([]);
    const [read, setRead] = useState([]);
    const shelf = ["currently Reading", "want To Read", "read"];

    useEffect(() => {
        const fetchDataBooks = async () => {
            const { books } = await BooksApi.getAllBooks();

            // set state data books
            setcurrentRead(
                books.filter((obj) => obj.shelf == "currentlyReading")
            );
            setwantToRead(books.filter((obj) => obj.shelf == "wantToRead"));
            setRead(books.filter((obj) => obj.shelf == "read"));
        };
        fetchDataBooks();
    }, []);

    // handle update data books
    const changeSheft = (e) => {
        const id = e.target.id;
        const shelf = e.target.value;

        const updateBooks = async (id, shelf) => {
            await BooksApi.updateBooks(id, { shelf: shelf });
            const { books } = await BooksApi.getAllBooks();

            // update state data books
            setcurrentRead(
                books.filter((obj) => obj.shelf == "currentlyReading")
            );
            setwantToRead(books.filter((obj) => obj.shelf == "wantToRead"));
            setRead(books.filter((obj) => obj.shelf == "read"));
        };

        updateBooks(id, shelf);
    };

    return (
        <Container fluid>
            <Row>
                <h1 className="text-center text-light bg-success py-2">
                    MyRead
                </h1>
                <Link className=" col-1 link-search" to="/search">
                    Search
                </Link>
            </Row>
            <Row>
                <h1 className="border-bottom my-2">Currently Readding</h1>
                {currentRead?.map((books, id) => {
                    return (
                        <Col lg="2" key={id}>
                            <Card className="my-2">
                                <Card.Img
                                    variant="top"
                                    src={books.imageLinks.smallThumbnail}
                                    height="250px"
                                />
                                <Card.Body>
                                    <Card.Title>{books.title}</Card.Title>
                                    <Card.Text>
                                        {books.authors.map((authors) => {
                                            return <span>{authors}, </span>;
                                        })}
                                    </Card.Text>
                                    <Form.Select
                                        id={books.id}
                                        onChange={changeSheft}
                                    >
                                        <option>Select shelf</option>
                                        {shelf.map((element) => {
                                            if (
                                                element == "currently Reading"
                                            ) {
                                                return (
                                                    <option
                                                        value={element
                                                            .split(" ")
                                                            .join("")}
                                                        selected
                                                    >
                                                        {element}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option
                                                    value={element
                                                        .split(" ")
                                                        .join("")}
                                                >
                                                    {element}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <Row>
                <h1 className="border-bottom my-2">Want To Read</h1>
                {wantToRead?.map((books, id) => {
                    return (
                        <Col lg="2" key={id}>
                            <Card className="my-2">
                                <Card.Img
                                    variant="top"
                                    src={books.imageLinks.smallThumbnail}
                                    height="250px"
                                />
                                <Card.Body>
                                    <Card.Title>{books.title}</Card.Title>
                                    <Card.Text>
                                        {books.authors.map((authors) => {
                                            return <span>{authors}, </span>;
                                        })}
                                    </Card.Text>
                                    <Form.Select
                                        id={books.id}
                                        onChange={changeSheft}
                                    >
                                        <option>Select shelf</option>
                                        {shelf.map((element) => {
                                            if (element == "want To Read") {
                                                return (
                                                    <option
                                                        value={element
                                                            .split(" ")
                                                            .join("")}
                                                        selected
                                                    >
                                                        {element}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option
                                                    value={element
                                                        .split(" ")
                                                        .join("")}
                                                >
                                                    {element}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <Row>
                <h1 className="border-bottom my-2">Reading</h1>
                {read?.map((books, id) => {
                    return (
                        <Col lg="2" key={id}>
                            <Card className="my-2">
                                <Card.Img
                                    variant="top"
                                    src={books.imageLinks.smallThumbnail}
                                    height="250px"
                                />
                                <Card.Body>
                                    <Card.Title>{books.title}</Card.Title>
                                    <Card.Text>
                                        {books.authors.map((authors) => {
                                            return <span>{authors}, </span>;
                                        })}
                                    </Card.Text>
                                    <Form.Select
                                        id={books.id}
                                        onChange={changeSheft}
                                    >
                                        <option>Select shelf</option>
                                        {shelf.map((element) => {
                                            if (element == "read") {
                                                return (
                                                    <option
                                                        value={element
                                                            .split(" ")
                                                            .join("")}
                                                        selected
                                                    >
                                                        {element}
                                                    </option>
                                                );
                                            }
                                            return (
                                                <option
                                                    value={element
                                                        .split(" ")
                                                        .join("")}
                                                >
                                                    {element}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default Home;
