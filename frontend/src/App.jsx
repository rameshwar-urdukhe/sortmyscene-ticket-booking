import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/events" element={<Events />} />

        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
