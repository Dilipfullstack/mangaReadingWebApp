import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Pages from "./pages";
import variables from "../misc/variables";

const Book = (props) => {
    
    const currentBook = props.currentBook
    const [allChapter, setAllChapter] = useState([]);
    const [currentChapter, setCurrentChapter] = useState(1);

    const handlecurrentChapter = (chapterNumber) => {
        setCurrentChapter(chapterNumber);
    }

    useEffect(() => {
        axios.get(`${variables.baseURL}/books/${currentBook}/`).then(response => {
            setAllChapter(response.data.chapter_ids);
            setCurrentChapter(response.data.chapter_ids[0])
        })
    }, [currentBook]);

    return(
        <>
        <br/>
        {   allChapter.map((a, i) => {
            return <button key={i} onClick={() => handlecurrentChapter(a)}
                className={currentChapter === a ? "selected": "notselected"}>{a}</button>
        })
        }
        <Pages currentBook={props.currentBook} currentChapter={currentChapter}
            setCurrentChapter={setCurrentChapter} allChapter={allChapter} />
        </>
    )
}

export default Book