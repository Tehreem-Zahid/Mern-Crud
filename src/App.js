import './App.css';
import Navbar from './components/Navbar.js';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Create from './components/Create.js';
import Read from './components/Read.js';
import Update from './components/Update.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Create/>}/>
        <Route exact path="/all" element={<Read/>}/>
        <Route exact path="/:id" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
