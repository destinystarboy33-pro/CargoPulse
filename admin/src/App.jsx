import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyCode from "./Pages/VerifyCode";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Pages/DashBoard";
import ProtectedRoute from "./components/ProtectRoute";
import Shipments from "./Pages/Shipment";
import CreateShipment from "./Pages/CreateShipment";
import ShipmentDetails from "./Pages/ShipmentDetails";
import EditShipment from "./Pages/EditShipment";


import './App.css'

function App() {
 

  return (
    <>
        <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-code"
          element={<VerifyCode />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


         <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route path="/shipment" element={<ProtectedRoute><Shipments /></ProtectedRoute>}></Route>

        <Route
          path="/shipments/create"
          element={
          <ProtectedRoute>
          <CreateShipment />
          </ProtectedRoute>}></Route>

              <Route
                path="/shipments/:id"
                element={
                  <ProtectedRoute>
                    <ShipmentDetails />
                  </ProtectedRoute>}></Route>


                  <Route
                  path="/shipments/:id/edit"
                  element={
                    <ProtectedRoute>
                      <EditShipment />
                    </ProtectedRoute>}></Route>


      </Routes>

       <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter> 
    </>
  )
}

export default App
