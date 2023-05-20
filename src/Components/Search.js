import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BooksApi from "../API/BooksApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Search() {
    const [dataSearch, setDataSearch] = useState([]);
    const [result, setResult] = useState([]);
    const shelf = ["currently Reading", "want To Read", "read"];

    useEffect(() => {
        const fetchDataBooks = async () => {
            const { books } = await BooksApi.getAllBooks();
            setDataSearch(books);
        };
        fetchDataBooks();
    }, []);

    // handle search input
    // key search : book title
    const handleSearch = (e) => {
        const keySearch = e.target.value.toLowerCase().trim();
        console.log(keySearch);
        setResult(
            dataSearch.filter((data) =>
                data.title.toLowerCase().includes(keySearch)
            )
        );
        if (keySearch == "") {
            setResult([]);
        }
    };

    // handle update data books
    const changeSheft = (e) => {
        const id = e.target.id;
        const shelf = e.target.value;

        const updateBooks = async (id, shelf) => {
            await BooksApi.updateBooks(id, { shelf: shelf });
        };
        updateBooks(id, shelf);
    };

    return (
        <div>
            <div class="input-group mb-3 ">
                <Link
                    to="/"
                    className="btn btn-outline-secondary rounded-0"
                    id="button-addon1"
                >
                    Back
                </Link>
                <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    onChange={handleSearch}
                />
            </div>
            <Row>
                {result?.map((books, id) => {
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
        </div>
    );
}

export default Search;
