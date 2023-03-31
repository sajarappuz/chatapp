import { auth,provider } from "../config/Firebase";
import { signInWithPopup } from "firebase/auth";
//cookies

import Cookies from "universal-cookie/cjs/Cookies";
const cookies = new Cookies();

export const Auth = (props) =>{
       const {setIsAuth} = props;
   const signInWithGoogle = async () =>{
   const result =  await signInWithPopup(auth,provider);
   cookies.set("auth-token",result.user.refreshToken);
    setIsAuth(true);
       };


 return (<div className="auth">
    <p>Sign In With Google to Continue</p>
    <button onClick={ signInWithGoogle}>Sign In With Google</button>
 </div>
 )
    };
