import React,{useState} from "react";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import InputControl from "../InputControl/InputControl"
import styles from "./Signup.module.css"
import Header from "../Header";
import Footer from "../Footer";
import { useUserAuth } from "../../context/UserAuthContext";



export default function Signup(){
    const {signUp}= useUserAuth();
    const navigate=useNavigate();
    const [values, setValues]=useState({
        name: "",
        email: "",
        pass: "",
    })

    const [errorMsg, setErrorMsg]= useState("");

    const handleClick = async() =>{
        if(!values.name || !values.email || !values.pass){
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("")
        try{
            await signUp(values.email, values.pass);
            navigate("/login")
        }
        catch (err){
            setErrorMsg(err.message)
        }
        

        // createUserWithEmailAndPassword(auth, values.email, values.pass)
        //     .then(async(userCredentials) => {
        //         const user=userCredentials.user;
        //        await updateProfile(user, {
        //             displayName :  values.name
        //         })
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
                    <h1 className={styles.heading}>Sign Up</h1>
                    <InputControl label="Name" placeholder="Enter your name" value={values.name}
                     name="name" 
                        onChange={handleChange}
                    />
                    <InputControl label="Email" placeholder="Enter email address" type="email" value={values.email}
                        name="email"
                        onChange={handleChange}
                    />
                    <InputControl label="Password" placeholder="Enter Password" type="password" value={values.pass}
                        name="pass"
                        onChange={handleChange}
                    />

                    <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b>
                        <button onClick={handleClick}>SignUp</button>  
                        <p>
                            Already have an account?{" "}
                            <span>
                            <Link to="/login">Sign In</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

