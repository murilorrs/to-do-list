import React from "react";
import {FaEdit, FaWindowClose} from 'react-icons/fa'
import './Tarefas.css'


export default function Tarefas({tarefas, handleDelete, handleEdit}){
    return (
        <ul className="tarefas">
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <div>
                <FaEdit
                className="edit"
                onClick={(e) => handleEdit(e, index)}
                />

                <FaWindowClose
                className="delete"
                onClick={(e) => handleDelete(e, index)}
                />
              </div>
            </li>
          ))}
        </ul>
    )
}