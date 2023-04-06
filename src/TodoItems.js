import React from 'react';

class TodoItems extends React.Component {  

  constructor(props) {    
    super(props);     
    this.createTasks = this.createTasks.bind(this);  
  }   
  
  delete(key){     
    this.props.delete(key);  
  }

  createTasks(item) {    
    return (
    <li onDoubleClick = {() => 
      this.delete(item.key)} 
      key = { item.key }>
      { item.text }
      </li>
    )
  }   
  
  render() {    
    let todoEntries = this.props.entries;    
    let listItems = todoEntries.map(this.createTasks);     
    
    return (      
      <ul className = 'todo-items'>
          { listItems }
      </ul>
      );  
    }
  } 
 
export default TodoItems;