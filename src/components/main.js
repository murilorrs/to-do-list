import React, { Component } from "react";

import Form from './Form'
import Tarefas from './Tarefas'

import './main.css'


//tarefas
//importando react

//exportando uma classe que extende de react.component
export default class Main extends Component{
  //state re-renderiza o componente novaTarefa toda vez q setState é chamado
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };

  componentDidMount(){
    const tarefas = JSON.parse(localStorage.getItem('tarefas'))

    if(!tarefas)return;
    this.setState({
        tarefas
    })
  }

  componentDidUpdate(prevProps, PrevState){
    const {tarefas} = this.state;

    if(tarefas === PrevState.tarefas) return

    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }


  handleSubmit = (e) =>{
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
        index: -1,
        novaTarefa: '',
      })
    }
  }

   handleChange = (e) => {
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

        <Form 
        handleSubmit={this.handleSubmit} 
        handleChange = {this.handleChange}
        novaTarefa = {novaTarefa}
        />

        <Tarefas
        tarefas = {tarefas}
        handleEdit = {this.handleEdit}
        handleSubmit = {this.handleSubmit}
        />

      </div>
    )
  }
}
