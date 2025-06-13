import { useEffect, useState } from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import '../../styles.css'

const WelcomeScreen = () => {
    const [whichState, setWhichState] = useState("signIn")
    const handleOnClick = (text:string) => {
        setWhichState(text);
    }
    // const container = "container " + (whichState === "signUp" ? "right-panel-active" : "");

    return(
        <>
            <div>
                <h1 style={{marginTop:'0px', marginBottom:'40px'}}>Welcome to My Recipes!</h1>
                <div className='containerr'>
                    <div>
                        <SignInForm/>
                        <SignUpForm/>
                    </div>
                    <div className='overlayer overlay-right'>
                        <h1>Hello, Chef!</h1>
                        <p>Do you have an account?</p>
                        <button onClick={() => handleOnClick("signUp")}>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WelcomeScreen
