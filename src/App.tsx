import {
  BrowserRouter, Link, Route, Routes
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import { initializeApp } from 'firebase/app';
import { FIREBASE_DEV_CONFIG } from './FirebaseConfig';

function App() {
  const app = initializeApp(FIREBASE_DEV_CONFIG)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
