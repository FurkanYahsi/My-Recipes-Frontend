import { useState } from 'react'
import SignUpForm from '../../../components/SignUpForm/SignUpForm';
import SignInForm from '../../../components/SignInForm/SignInForm';
import '../../../styles.css'

const WelcomeScreen = () => {
    const [whichState, setWhichState] = useState("signUp");
    const [clear, setClear] = useState(true);
    const handleOnClick = (text:string) => {
        setWhichState(text);
        setClear(false);
    }
    const overlayer = "overlayer " + (whichState === "signIn" ? "go-to-left" : "go-to-right");

    return(
        <>
            <div>
                <div className="container">
                    <div>
                        <SignInForm clear={clear} whichState={whichState} />
                        <SignUpForm clear={clear} whichState={whichState} />
                    </div>
                    <div className={overlayer}>
                       
                        {whichState === "signUp" ? (
                            <>
                                <h1>Hello, Chef!</h1>
                                <p>Do you have an account?</p>
                                <button onClick={() => handleOnClick("signIn")}>Sign Up</button>
                            </>
                        ) : (
                            <>
                                <h1>Welcome Back!</h1>
                                <p>Don't have an account?</p>
                                <button onClick={() => handleOnClick("signUp")}>Sign In</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default WelcomeScreen
