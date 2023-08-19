import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Certificates from "./components/Certificates";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/certificates"
          element={
            <PrivateRoute>
              <Certificates />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
