import React from 'react';
import UserFeedResult from './UserFeedResult';

const UserFeedResult = (props) => {
    return(
        <div>
            {
                props.results.map((result, i) => {
                    return(
                        <UserFeedResult key={i} />
                    );
                })
            }
        </div>
    )
}