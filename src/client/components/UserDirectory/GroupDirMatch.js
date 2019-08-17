import React, { Component } from 'react';

class GroupDirMatch extends Component {

    render() {
        return (
            <div>
                <h2> {this.props.now_dir} </h2>
                {
                    this.props.match_results.map((result, i) => {
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
}

export default GroupDirMatch;