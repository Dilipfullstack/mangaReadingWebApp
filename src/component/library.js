import { useState, useEffect } from "react";
import axios from 'axios'
import variables from "../misc/variables";
import Book from "./book";

const Library = () => {

    const [allBook, setAllBook] = useState([]);
    const [currentBook, setCurrentBook] = useState(1);

    useEffect(() => {
        axios.get(`${variables.baseURL}/books/`).then(response => {
            let bookList = response.data;
            setAllBook(bookList);
        }); 
    }, []);

    const handleCurrentBook = (bookId) => {
        setCurrentBook(bookId)
    }

    return (
        <>
        { allBook.map((a) => {
            return (
                    <>
                    <button key={a.id} onClick={() => handleCurrentBook(a.id)}
                        className={currentBook === a.id ? "selected" : "notselected"}>{a.title}</button>
                    </>
            )
        })
        }
        <Book currentBook={currentBook} setCurrentBook={setCurrentBook}/>
        <br/>
        </>
    )
}

export default Library;