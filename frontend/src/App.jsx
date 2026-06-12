import {BrowserRouter, Routes, Route} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StudentForm from "./pages/Home.jsx";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/portal" element={<StudentForm/>}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;