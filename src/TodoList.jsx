import React from 'react';
import './index.css';
import TodoItems from './TodoItems';

class TodoList extends React.Component { 
  constructor(props) {    
    super(props);     

    this.state = {    
      items: [],
      theme: this.getInitialTheme()
    };

    this.switchTheme = this.switchTheme.bind(this); 
    this.addItem = this.addItem.bind(this); 
    this.deleteItem = this.deleteItem.bind(this);
  }

  getInitialTheme() {
    try {
      const savedTheme = JSON.parse(localStorage.getItem('theme')) || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      return savedTheme;
    } catch {
      return 'light';
    }
  }

  switchTheme() {
    const theme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({ theme });
    document.documentElement.setAttribute('data-theme', theme);
  }

  addItem(e) {
    let itemArray = this.state.items;

    if (this._inputElement.value !== '') {    
      itemArray.unshift(
        {      
          text: this._inputElement.value,      
          key: Date.now()    
        }
      );

      this.setState({      
        items: itemArray    
      });   

      this._inputElement.value = '';  
    }    
    e.preventDefault();
  }

  deleteItem(key) {  
    let filteredItems = this.state.items.filter(function (item) {    
      return (item.key !== key);  
    }); 

    this.setState({    
      items: filteredItems  
    });
  }

  render() {
      return (
      <div className='wrapper'>
        <div className = 'todo-list'>
          <div className = 'todo-form'>
            <form onSubmit = { this.addItem }>
            <input ref = { (a) => this._inputElement = a } 
            placeholder = 'Enter task'>
            </input>
            <button type = 'submit'>Add task</button>
            </form>
          </div>
          <TodoItems 
          entries = { this.state.items }
          delete = { this.deleteItem }/>
        </div>
        <button className={this.state.theme === 'dark' ? 'icon-moon' : 'icon-sun'} onClick = {this.switchTheme}></button>
       </div>
    );
  }

  componentWillMount() {
    let itemsList = localStorage.getItem('items')
    if (itemsList) {
      this.setState({
        items: JSON.parse(localStorage.getItem('items'))
      })
    }
  }


  componentDidUpdate() {
    localStorage.setItem('items', JSON.stringify(this.state.items));
    localStorage.setItem('theme', JSON.stringify(this.state.theme));
  }
}
 
export default TodoList;