import { useEffect, useState } from "react";
import pageData from "../misc/manga";

const Pages = (props) => {

    const currentBook = props.currentBook;
    const currentChapter = props.currentChapter;
    const setCurrentChapter = props.setCurrentChapter;
    const allChapter = props.allChapter
    const [pagesInChapter, setPagesInChapter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
            for(let i = 0; i < pageData.length; i++) {
                if(pageData[i].bookID === currentBook && pageData[i].chapterID === currentChapter) {
                    setPagesInChapter(pageData[i].pages)
                    break;
                }
            }
    }, [currentBook, currentChapter, pagesInChapter, currentPage, allChapter]);
    
    console.log('currentBook', currentBook)
    console.log('currentChapter', currentChapter)
    console.log('pagesInChapter', pagesInChapter);
    console.log('currentPage', currentPage);
    console.log('allChapter', allChapter)
    
    const nextPage = () => {
        if(currentPage >= pagesInChapter.length) {
            if(currentChapter >= allChapter[allChapter.length - 1]) {
                setCurrentChapter(allChapter[0])
                setCurrentPage(1)
            } else {

                setCurrentChapter(currentChapter + 1);
                setCurrentPage(1)
            }
        } else {
            setCurrentPage(currentPage + 1)
        }
    }

    const previosPage = () => {
        console.log('this')
        if(currentPage <= 1) {
            if(currentChapter <= allChapter[0]) {
                setCurrentChapter(allChapter[allChapter.length - 1])
                setCurrentPage(pagesInChapter.length - 1)
            } else {
                setCurrentChapter(currentChapter - 1);
                for(let i = 0; i < pageData.length; i++) {
                    if(pageData[i].bookID === currentBook && pageData[i].chapterID === currentChapter - 1) {
                        setCurrentPage(pageData[i].pages.length)
                        break;
                    }
                }
            }
        } else {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <>
        <div className="img-container">
        {
            currentPage === 1 ? <img className="manga-page" key={currentBook} src={pagesInChapter[0]} 
                alt="manga" useMap="#nextpage"/> : 
                <><img className="manga-page" key={currentBook} src={pagesInChapter[currentPage - 1]} 
                alt="manga" useMap="#nextpage"/></>
        }
        {
            <map name="nextpage" >
                <area shape="rect" coords="282, 0, 400, 558" alt="nextpage" 
                    onClick={nextPage}/>
                <area shape="rect" coords="0, 0, 135, 550" alt="nextpage" 
                    onClick={previosPage}/>
            </map>
        }
        </div>
        <span>{currentPage}/{pagesInChapter.length}</span>
        </>
    )
}

export default Pages;