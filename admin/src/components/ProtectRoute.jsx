import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;










// import { useNavigate } from "react-router-dom"
// import Cookies from "js-cookie"
// import { jwtDecode } from "jwt-decode"
// import { Outlet, Navigate } from "react-router-dom"




// const ProtectedRoute = () => {
//      let isValid = true

//     try{
//           const token = Cookies.get("token")
//     const decoded = jwtDecode(token)
//      console.log(decoded)

    

//     if (!token) {
//         isValid = false
//     }

//     if (!decoded.exp || decoded.exp * 1000 < new Date().getTime()) {
      
//       isValid = false
//     }

   
//     } catch(error){
//         console.log(error)
//         isValid = false
       
//     }


// if (!isValid) {
//       Cookies.remove("token")
//       return <Navigate to = "/login" />
// }

  

//     // const navigate = useNavigate()
//   return <Outlet />
// }

// export default ProtectedRoute
