import React,{useEffect} from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Landing from './pages/Landing';
import { useDispatch } from 'react-redux';
import { walletLogin } from './reducers/user';
import Lobby from './pages/Lobby';
import Components from './pages/Components';
import Garage from './pages/Garage';
import Races from './pages/Races';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem("addr")){
      dispatch(walletLogin(localStorage.getItem("addr")));
    }
  }, [dispatch]);
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/lobby" element={<Lobby/>}/>
        <Route path="/components" element={<Components/>}/>
        <Route path="/garage" element={<Garage/>}/>
        <Route path="/races" element={<Races/>}/>
      </Routes>
    </div>
  );
}

export default App;
