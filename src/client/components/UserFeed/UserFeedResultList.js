import React from 'react';
import UserFeedResult from './UserFeedResult';

const UserFeedResultList = (props) => {
    return (
        <div>
            {
                props.results.map((result, i) => {
                    return (
                        <UserFeedResult dirlists = {props.dirlists} title={result.title} />
                    )
                })
            }
        </div>
    );
}

export default UserFeedResultList;