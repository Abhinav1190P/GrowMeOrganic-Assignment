
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import FormPage from './FormPage';
import SecondPage from './SecondPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<FormPage/>}/>

        <Route  path="/second-page" element={<SecondPage/>}/>
      
      </Routes>
    </Router>
  );
};

export default App;
