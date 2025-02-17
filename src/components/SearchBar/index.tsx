/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { useState } from "react";

type Props = {
    onSearch: Function;
}
export default function SearchBar({ onSearch }: Props){

    const [text, setText] = useState("");

    function handleChange(event: any): void {
        setText(event.target.value);
    }

    function handleSubmit(event: any): void {
        event.preventDefault();
        onSearch(text);
    }

    function handleResetClick(){
        setText("");
        onSearch(text);
    }

    return(
        <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
            
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2"><i className="bi bi-search" /></button>
                <input 
                    value={text}
                    type="text" 
                    className="form-control" 
                    placeholder="Pesquisar Paciente" 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2" 
                    onChange={handleChange}
                />
                <button 
                    className="btn btn-outline-secondary" 
                    id="button-addon2"
                    onClick={handleResetClick}
                >
                    <i className="bi bi-x" />
                </button>                
            
        </div> 
        </form>
       
    )
}