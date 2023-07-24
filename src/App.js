import * as React from "react";

const initialState = {
  todo: []
}

const reducer = (state, action) => {

  switch(action.type) {
    case 'add':
      return {...state, todo: [...state.todo, action.todoVal]};
    case 'clear':
      return {...state, todo: []};
    default:
      throw new Error("Nothing to add");
  }
}

export default function App() {
  
  const inputVal = React.useRef('');
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    inputVal.current.value = '';
  }, [state])

  return (
    <div>
      <h2>React Todo Application</h2>
      <ul>
        {state.todo?.length > 0 && state.todo?.map((val, key) => {
          return(<li key={key}>{val}</li>)
        })}
      </ul>
      <div style={{padding: "10px"}}>
        <input type="text" name="todo" ref={inputVal} />
        <button onClick={() => dispatch({type: 'add', todoVal: inputVal.current.value})}>Add Todo</button>
      </div>
      <div style={{padding: "10px"}}>
        <button style={{padding: "5px", backgroundColor: "red", color:"#ffff"}} onClick={() => dispatch({type: 'clear'})}>Clear Todo</button>
      </div>
    </div>
  );
}
