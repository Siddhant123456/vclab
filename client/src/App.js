import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Room from './Components/Room/Room';
import Auth from './Components/Auth/Auth';
import NavHead from  './Components/Nav/NavHead';
import {BrowserRouter , Switch , Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <NavHead/>

      <Switch>
          <Route path = "/" exact component = {Room}></Route>
          <Route path = "/auth" exact component = {Auth}></Route>
        </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
