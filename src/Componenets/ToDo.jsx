import React, { Component } from 'react';
import './TodoList.css';
import FlipMove from 'react-flip-move';
import 'bootstrap/dist/css/bootstrap.min.css';

class TodoItems extends Component {
    constructor(props) {
      super(props);
      this.createTasks = this.createTasks.bind(this);
    }
  
    createTasks(item) {
      return <li onClick={() => this.delete(item.key)} key={item.key}>{item.text}</li>
    }
    
    delete(key) {
      this.props.delete(key);
    }
  
    render() {
      var todoEntries = this.props.entries;
      var listItems = todoEntries.map(this.createTasks);
  
      return (
        <div className="container">
            <ul className="theList">
            <FlipMove duration={250} easing="ease-out">
                {listItems}
            </FlipMove>
            </ul>
        </div>
      );
    }
  };

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value !== '') {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now()
      };
      
      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
        };
      });

      this._inputElement.value = '';
    }
    
    console.log(this.state.items);
    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (
      <div className='todoListMain'>
        <h3 className='header-title'>Todo Application</h3>
        <div className='header'>
          <form onSubmit={this.addItem}>
            <input  ref={(a) => this._inputElement = a} placeholder='Enter task'></input>
            <button type='submit'>add</button>
          </form>
        </div>
        <TodoItems entries={this.state.items} delete={this.deleteItem}/>
      </div>
    );
  }
}

export default TodoList;