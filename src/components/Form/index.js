import React from "react";
import { FaPlus } from 'react-icons/fa'
import './Form.css'

export default function Form({novaTarefa, handleChange, handleSubmit}){
    return (

        <form onSubmit={handleSubmit} action="#" className="form">
            <input onChange={handleChange} type="text" value={novaTarefa}/>
            <button type="submit">
            <FaPlus/>
            </button>
        </form>

    )


}