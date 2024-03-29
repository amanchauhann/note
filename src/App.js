import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Nav from './Components/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
