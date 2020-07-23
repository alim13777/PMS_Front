import React from 'react';
import apiClient from '../services/api';

const Books = (props) => {
    const [books, setBooks] = React.useState([]);
    React.useEffect(() => {
        if (props.loggedIn) {
            apiClient.get('/api/papers')
                .then(response => {
                    setBooks(response.data)
                })
                .catch(error => console.error(error));
        }
    });
    const bookList = books.map((book) =>
        <div key={book.paperId}
             className="list-group-item"
        >
            <h5>{book.title}</h5>
            <small>{book.topic}</small>
        </div>
    );
    if (props.loggedIn) {
        return (
            <div className="list-group">{bookList}</div>
        );
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default Books;