import React, { Component } from "react";
import Form from "./Form";
import Tarefas from "./Tarefas";
import Titulo from './Titulo'
import './main.css'


//exportando uma classe que extende de react.component
export default class Main extends Component{
  //state re-renderiza o componente novaTarefa toda vez q setState é chamado
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };

  componentDidMount(){
    let tarefas;
    const storageData = localStorage.getItem('Tarefas')
    
    storageData.length > 1 ? tarefas = JSON.parse(storageData) : tarefas = []

    this.setState({
        tarefas:tarefas
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas.length !== prevState.tarefas.length) {
      localStorage.setItem('Tarefas', JSON.stringify(tarefas));
    }
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
        index: -1
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

        <Titulo/>

        <Form
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
            novaTarefa = {novaTarefa}
        />
        <Tarefas
            tarefas = {tarefas}
            handleDelete = {this.handleDelete}
            handleEdit = {this.handleEdit}
        />
      </div>
    )
  }
}
