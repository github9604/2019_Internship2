import React from 'react';

const SearchArea = (props) => {
    return (
        <div>
            <section>
                <form action="" onSubmit={props.handleSubmit}>
                    <div>
                        <input placeholder="url input" type="text" onChange={props.handleChange}/>
                        <button onclick={props.handleSubmit}> 입력 </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default SearchArea;