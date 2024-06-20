import React, { Component } from "react";
import './main.css'

//form
import { FaPlus } from 'react-icons/fa'

//tarefas
import {FaEdit, FaWindowClose} from 'react-icons/fa'
//importando react

//exportando uma classe que extende de react.component
export default class Main extends Component{
  //state re-renderiza o componente novaTarefa toda vez q setState é chamado
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };


  hendleSubmit = (e) =>{
    e.preventDefault();//previnindo que a pagina atualize ao enviar
    let { tarefas, index} = this.state//pegando o array [] do state
    let{ novaTarefa } = this.state;

    novaTarefa = novaTarefa.trim()

    if(tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if(index === -1){
      this.setState({
        tarefas:[...novasTarefas, novaTarefa],
        novaTarefa: ''
      })
    }else{
      novasTarefas[index] = novaTarefa

      this.setState({
        tarefas: [...novasTarefas],
        index: -1
      })
    }
  }

   handleChance = (e) => {
    this.setState({
      novaTarefa: e.target.value,//pega oq ta sendo digitado no campo e renderiza dnv
    })
   }

   handleEdit = (e, index) =>{
    const { tarefas } = this.state;

    this.setState({
      novaTarefa: tarefas[index],
      index: index
    })
   }

   handleDelete = (e, index) =>{
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas]

    novasTarefas.splice(index, 1);
    this.setState({
      tarefas: [...novasTarefas],
    })
   }

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (

      <div className="main">
        <h1>{"Lista de Tarefas"}</h1>

        <form onSubmit={this.hendleSubmit} action="#" className="form">
          <input onChange={this.handleChance} type="text" value={novaTarefa}/>
          <button type="submit">
            <FaPlus/>
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <div>
                <FaEdit
                className="edit"
                onClick={(e) => this.handleEdit(e, index)}
                />

                <FaWindowClose
                className="delete"
                onClick={(e) => this.handleDelete(e, index)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
