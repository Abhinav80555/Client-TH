import "./App.css";
import { Route, Routes ,Navigate, Outlet} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Booking } from "./pages/Booking";
import 'antd/dist/antd.css';


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:productId" element={<Booking/>} />
          </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </div>
  );
}



export function ProtectedRoute(props){

if(localStorage.getItem('user')){
  return <Outlet{...props}/>
}
  else{
    return <Navigate to="/login" />
  }
}