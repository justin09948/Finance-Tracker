import Register from "./pages/Register.jsx"
import Login from"./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import ProtectedRoute from "./componenets/ProtectedRoute.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return(
    <Router>
      <Routes>
        <Route element = {<ProtectedRoute></ProtectedRoute>}>
          <Route path="/home" element= {<Home></Home>}></Route>
        </Route>
        <Route path="/register" element = {<Register></Register>}></Route>
        <Route path = "/" element = {<Login></Login>}></Route>
      </Routes>
    </Router>
  )
}

export default App
