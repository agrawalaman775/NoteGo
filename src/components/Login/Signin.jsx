import React,{useState} from "react";
import { signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import InputControl from "../InputControl/InputControl"
import GoogleButton from "react-google-button";
import styles from "./Signin.module.css"
import Header from "../Header";
import Footer from "../Footer";
import { useUserAuth } from "../../context/UserAuthContext";

export default function Signin(){
    const {logIn, googleSignIn }= useUserAuth();
    const navigate=useNavigate();
    const [values, setValues]=useState({
        email: "",
        pass: "",
    })

    const [errorMsg, setErrorMsg]= useState("");

    const handleClick = async() =>{
        if(!values.email || !values.pass){
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("")
        try{
            await logIn(values.email, values.pass);
            navigate("/")
        }
        catch(err){
            setErrorMsg(err.message)
        }

        
        // signInWithEmailAndPassword(auth, values.email, values.pass)
        //     .then(async(userCredentials) => {
        //         onAuthStateChanged(auth, (user) => {
        //             if(user){
        //                 navigate("/")
        //             }
        //         })
                
        //     })
        //     .catch((err) => {
        //         setErrorMsg(err.message)
        //     })
    };

    const handleGoogleSignIn= async() => {
        try{
            await googleSignIn();
            navigate("/")
        }
        catch(err){
            setErrorMsg(err.message)
        }
    }

    

    function handleChange(event) {
        const { name, value } = event.target;
    
        setValues(prevNote => {
          return {
            ...prevNote,
            [name]: value
          };
        });
      }

    return(
        <div>
            
            <div className={styles.container}>
            <h1 className={styles.title}>NoteGo</h1>
                <div className={styles.innerBox}>
                    <h1 className={styles.heading}>SignIn</h1>

                    <InputControl label="Email" placeholder="Enter email address" type="email" value={values.email} name="email" onChange={handleChange}/>
                    <InputControl label="Password" placeholder="Enter Password" type="password" value={values.pass} name="pass" onChange={handleChange}/>

                    <div className={styles.footer}>
                        <b className={styles.error}>{errorMsg}</b>
                        <button onClick={handleClick}>SignIn</button>
                        <div>
                        <GoogleButton
                            type="dark"
                            onClick={handleGoogleSignIn}
                        /> 
                        </div>
   
                        <p>
                            Don't have an account?{" "}
                            <span>
                            <Link to="/signup">Sign Up</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

