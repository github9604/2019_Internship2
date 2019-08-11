import React from 'react';

const SearchArea = (props) => {
    return (
        <section className="searchform">
            <form className="searchform" action="" onSubmit={props.handleSubmit}>
                <input placeholder="url input" type="text" onChange={props.handleChange} />
                <button onclick={props.handleSubmit}> 입력 </button>
            </form>
        </section>
    );
}

export default SearchArea;