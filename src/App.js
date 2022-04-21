import Home from "./router/component/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./router/component/navigation/navigation.component";
import Auth from "./router/component/auth/auth.component";


const Shop = () => {
  return <h1>I am shopping page</h1>
}

const Contact = () => {
  return <h1>I am contact page</h1>
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/contact" element={<Contact/>} />
      </Route>
    </Routes>

  );
};

export default App;
