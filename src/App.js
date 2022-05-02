import './App.css';
import CharacterCard from "./components/character-card";
import {useEffect, useState} from "react";

function App() {
    const [info, setInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageCount, setMaxPageCount] = useState(5);
    const [minPageCount, setMinPageCount] = useState(1);
    let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`
    useEffect(()=>{
      fetch(url)
          .then(response => response.json())
          .then(data => {
              setInfo(data)
              setIsLoading(false)
              setPages(Array.from({length: Number(data.info.pages)}, (_, i) => i + 1 ))
          })
    }, [url])
    const handleNext = () => {
        console.log(currentPage)
        if(currentPage < pages.length){
            setIsLoading(true)
            setCurrentPage(currentPage+1);
            if(currentPage + 1 > maxPageCount){
                setMaxPageCount(maxPageCount + 5)
                setMinPageCount(minPageCount + 5)
            }
        }
    }
    const handlePrev = () => {
        console.log(currentPage)

        if(currentPage > 1){
            setIsLoading(true)
            setCurrentPage(currentPage - 1)
            if(currentPage < minPageCount){
                setMaxPageCount(maxPageCount - 5)
                setMinPageCount(minPageCount - 5)
            }
        }
    }
    const handleClick = (page) => {
        setIsLoading(true)
        setCurrentPage(page)
    }

    return (
    <div className="App">
      <h1>Rick and Morty</h1>
      <h3>CHARACTERS</h3>
        <div className={'buttonSection'}>
            <ul>
                <button className={currentPage === 1 ? 'hiddenItem' : null} onClick={handlePrev}>Prev</button>
                {pages.map(page => {
                    if(page <= maxPageCount && page >= minPageCount){
                        return(
                            <li key={page} onClick={() => handleClick(page)}
                                className={currentPage === page ? 'active' : null}>{page}</li>
                        )}
                })}
                <button className={currentPage === pages.length ? 'hiddenItem' : null} onClick={handleNext}>Next</button>
            </ul>
        </div>
        <div className={'cardSection'}>
            {!isLoading ? info.results.map(result => <CharacterCard key={result.id} data={result}/>) : <h1>Loading...</h1>}
        </div>
    </div>
  );
}

export default App;
