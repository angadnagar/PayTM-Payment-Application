import { BrowserRouter,Routes,Route } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import { Success } from "./pages/Success"
import { Failure } from "./pages/Failure"



function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<SendMoney/>}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/failure" element={<Failure/>}/>


        </Routes>
     </BrowserRouter>
     </>
  )
}

export default App
