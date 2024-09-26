import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {Text} from "./Text";
function App() {
  const [showText,setShowText] = useState(false);
  // const [usernameState,setUsernameState] = userState('');
  // const [passwordState,setPasswordState] = userState('');
  return (
    <div className="App">
      {/* <h1>Login</h1>
      <input type="text" onchange={(event) => {
  setUsernameState(event.target.value)}}/>
      <input type="password"/> */}
      <button onClick={() => {
        setShowText(!showText);
      }}>
        Show Text
      </button>

      {showText && <Text/>}
    </div>
  );
}

export default App;
