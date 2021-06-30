import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useDispatch } from 'react-redux';
import Room from './Components/Room/Room';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Auth from './Components/Auth/Auth';
import NavHead from  './Components/Nav/NavHead';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard/dashboard';
import {classes} from './actions/classes';
import { fetchNotes } from './actions/notes';
import Profile from './Components/Profile/Profile';
import Home from './Components/Home/Home';
import ClassDetail from './Components/ClassDetail/classDetail';
function App() {
  const dispatch = useDispatch();
  const authInfo = useSelector((state) => state.authData);
    
  useEffect(() => {
    if(localStorage.getItem("profile")){
      dispatch({type : 'AUTH' , payload : JSON.parse(localStorage.getItem("profile"))})
      dispatch({type : 'UPDATE_JOB' , payload : JSON.parse(localStorage.getItem("user"))});
        
    }
  },[dispatch])
  
  useEffect(() => {
    if(localStorage.getItem("profile")){
      const id = JSON.parse(localStorage.getItem("profile")).result._id;
      
      dispatch(classes(id));
      dispatch(fetchNotes(id));
    }
    
  },[dispatch,authInfo])

  return (
    <BrowserRouter>
    <div className="App">
    <NavHead/>

      <Switch>
          <Route path = "/" exact component = {Home}></Route>
          <Route path = "/auth" exact component = {Auth}></Route>
          <Route path = "/dashboard" exact component = {Dashboard}></Route>
          
          <Route path = "/profile" exact component = {Profile}></Route>
          <Route path = "/lab" exact component = {Room}></Route>
          <Route path = "/myclass/:id" exact component = {ClassDetail}></Route>
          
        </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
