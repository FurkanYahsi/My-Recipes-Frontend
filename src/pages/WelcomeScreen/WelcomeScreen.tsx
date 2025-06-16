import { useEffect, useState } from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import '../../styles.css'

const WelcomeScreen = () => {
    const [whichState, setWhichState] = useState("signUp");
    const handleOnClick = (text:string) => {
        setWhichState(text);
    }
    let overlayer = "overlayer go-to-right";

    useEffect(()=> {
        overlayer = "overlayer " + (whichState === "signIn" ? "go-to-left" : "go-to-right");
    },[whichState])

    return(
        <>
            <div>
                <h1 style={{marginTop:'0px', marginBottom:'40px'}}>Welcome to My Recipes!</h1>
                <div className="container">
                    <div>
                        <SignInForm/>
                        <SignUpForm/>
                    </div>
                    {whichState === "signUp" &&
                    <div className={`overlayer go-to-right`}>
                        <h1>Hello, Chef!</h1>
                        <p>Do you have an account?</p>
                        <button onClick={() => handleOnClick("signIn")}>Sign Up</button>
                    </div>
}                   
                    {whichState === "signIn" &&
                    <div className={`overlayer go-to-left`}>
                        <h1>Welcome Back!</h1>
                        <p>Don't have an account?</p>
                        <button onClick={() => handleOnClick("signUp")}>Sign In</button>
                    </div>
}
                </div>
            </div>
        </>
    );
}

export default WelcomeScreen
