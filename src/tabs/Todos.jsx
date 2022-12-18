import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };
  addTodo = text => {
    const toDo = { id: nanoid(), text: text };
    this.setState(({ todos }) => ({ todos: [...todos, toDo] }));
  };
  handleSubmit = query => {
    this.addTodo(query);
  };
  handleEdit = todo => {
    this.setState({
      isEditing: true,
      currentTodo: {
        ...todo,
      },
    });
  };
  handleDeleteTodo = id => {
    this.setState(pS => ({
      todos: pS.todos.filter(todo => todo.id !== id),
    }));
  };
  onUpdate = (e) => {
    e.preventDefault();
    const {currentTodo} = this.state;
    this.handleUpdateTodo = (id, updatedTodo) => {
      const { todos } = this.state;
      const updatedItem = todos.map(todo => {
        return todo.id === id ? updatedTodo : todo;
      });
      this.setState({
        isEditing: false,
        todos: updatedItem,
      });
    };
  }
  render() {
    const { todos, isEditing, currentTodo } = this.state;
    
    return (
      <>
        {isEditing ? <EditForm currentTodo={currentTodo} onUpdate={this.onUpdate} onCancel={this.onCancel} onChange={this.onChange}/> : <SearchForm onSubmit={this.handleSubmit} />}

        <Grid>
          {todos.length > 0 &&
            todos.map((todo, idx) => (
              <GridItem key={todo.id}>
                <Todo
                  deleteTodo={this.handleDeleteTodo}
                  id={todo.id}
                  text={todo.text}
                  counter={idx + 1}
                  editTodo={() => {
                    this.handleEdit(todo);
                  }}
                />
              </GridItem>
            ))}
        </Grid>
      </>
    );
  }
}
