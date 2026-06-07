import { Component } from 'react';
import Count from './Count.jsx';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      editVal: '',
      editIndex: null,
      isEditing: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
  }

  handleInputChange(e) {
    this.setState(() => ({
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  deleteTask(index){
    this.setState(prevState =>({
      todos: prevState.todos.filter((_,i) => i != index),
      editIndex: null,
      editVal: "",
    }))
  }


  handleEdit(index){
    if(this.state.editIndex == index){
      const newTodos = [...this.state.todos];
      newTodos[index] = this.state.editVal;
      this.setState(({
        editIndex: null, editVal: "", todos: newTodos,

      }))
      return;
    }
    this.setState(({editIndex: index, editVal: this.state.todos[index]}))

  }

  handleEditInput(e){
    this.setState(({editVal: e.target.value}))
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>
          All the tasks!
          <Count count={this.state.todos.length}/>
        </h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index}>
              {index == this.state.editIndex ? 
              <input
              type='text'
              name='edit-task'
              value = {this.state.editVal}
              onChange={this.handleEditInput}
              ></input> :
              todo}
              <button type="button" onClick={() => this.deleteTask(index)}>Delete</button>
              <button type="button" onClick={()=>this.handleEdit(index)}>
                {this.state.editIndex == index ? "Resubmit" : "Edit"}
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
