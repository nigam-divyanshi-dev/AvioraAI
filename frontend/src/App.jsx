import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.js";


function App()  {

  const googleLogin = async () => {
    const data =await signInWithPopup(auth, googleProvider)
    console.log(data)
  }



  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <button className="w-50xl h-24 bg-white " onClick={googleLogin}>
        Continue with Google
      </button>

    </div>
  )
}

export default App