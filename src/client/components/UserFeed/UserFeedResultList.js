import React from 'react';
import UserFeedResult from './UserFeedResult';

const UserFeedResultList = (props) => {

    return (
        <div>
            {
                props.results.map((result, i) => {
                    return (
                        <UserFeedResult addtoDirectory={props.addtoDirectory} author={result.author} articleId = {result.id} dirlists = {props.dirlists} visualUrl = {result.visual} title={result.title} />
                    )
                })
            }
        </div>
    );
}

export default UserFeedResultList;