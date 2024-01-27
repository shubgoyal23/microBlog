import { useState, useEffect } from "react";
import {useDispatch} from "react-redux"
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {Header, Footer} from "./components/index"
import { Outlet } from "react-router-dom";

function App() {
   const [loading, setLoading] = useState(true)
   const dispatch = useDispatch()

   useEffect(() => {
      authservice.currentUser()
      .then((userData) => {
         if(userData){
            dispatch(login({userData}))
         }else{
            dispatch(logout())
         }
      })
      .catch((e) => console.log("there is ", e))
      .finally(() => setLoading(false))
   }, [])

   return loading ? null : (
   <div className="min-h-screen flex flex-wrap justify-items-center bg-gray-600">
      <div className="w-full block">
         <Header />
         <main>
            <Outlet />
         </main>
         <Footer />
      </div>
   </div>)
}

export default App;
