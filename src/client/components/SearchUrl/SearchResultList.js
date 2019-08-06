import React from 'react';
import SearchResult from './SearchResult';

const SearchResultList = (props) => {
    return (
        <div>
           {
                props.results.map((result, i) => {
                    return(
                        <SearchResult key={i} name={result.title} />
                    )
                })   
            }
        </div>
    );
}

export default SearchResultList;