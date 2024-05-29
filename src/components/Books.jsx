import {  useState,useEffect} from 'react';
import axios from 'axios';

function Books() {
    
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {

        axios.get("https://reactnd-books-api.udacity.com/books", {
            headers: { 'Authorization': 'whatever-you-want' }
        })
        .then(response => {
            setBooks(response.data.books);
        })
        .catch(error => {
            if (error.response) {
                console.log("Status Code:", error.response.status);
                console.log("Website not found");
                setError(`Error: ${error.response.status}`);
                } else{
                    console.log("Error:", error.message);
                    setError("An error occurred while fetching data");
                }
        });
        }, []);

        if (error) {
            return <div className='error-div'>{error}</div>;
            }
        
        return (
            <div className="book-list">
            {books.map(book => (
                <div key={book.id} className="book">
                    <h2 className="book-title">{book.title}</h2>
                    <div className="book-content" >
                        <img src={book.imageLinks.thumbnail} className="book-image" alt={book.title}/>
                        <p className="book-desc">{book.description}</p>
                    </div>
                    <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                </div>
            ))}
            </div>
    )
}

export default Books