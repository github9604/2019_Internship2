import React, { Component } from 'react';
import MatchResult from './MatchResult';

const MatchResultList = (props) => {
    return (
        <div>
            <h2> {props.now_dir} </h2>
            {
                props.match_results.map((result, i) => {
                    return (
                        <div>
                            <h2>{result.article_title}</h2>
                            <h3> {result.article_author} </h3>
                            <h4> {result.article_content} </h4>
                        </div>
                        // <MatchResult title={result.title} author={result.author}/>
                    )
                })
            }
        </div>
    )
}

export default MatchResultList;