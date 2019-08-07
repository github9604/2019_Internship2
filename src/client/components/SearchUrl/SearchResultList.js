import React from 'react';
import SearchResult from './SearchResult';

const SearchResultList = (props) => {
    return (
        <div>
           {
                props.results.map((result, i) => {
                    return(
                        <SearchResult insertFeed={props.insertFeed} key={i} feedId = {result.feedId} title={result.websiteTitle} description = {result.description} iconUrl={result.iconUrl} topics={result.topics} />
                    )
                })   
            }
        </div>
    );
}

export default SearchResultList;