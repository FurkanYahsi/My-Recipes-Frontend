import { Button, Form, Input } from "antd";
import {Link} from "react-router-dom";
import useSignInForm from './SignInForm.logic';
import './SignInForm.css'

const SignInForm = () => {

    const {form, handleSubmit, contextHolder} = useSignInForm();
    return (
        <div className="full-background">
            <div className="form-box">
                {contextHolder}
                <Form
                    form={form}
                    name="basic"
                    key="loginForm"
                    onFinish = {handleSubmit}>
                    
                    <h2 className="header-text">My Recipes</h2>
                    
                    <Form.Item
                        className="margin-bottom-30px"
                        name='Email'
                        rules={[{ required: true, message: 'Please enter your email!'}]}
                    >
                        <Input className="padding-6px" type="text" name="loginEmailInput" key="loginEmailInput" placeholder="Email"/>
                    </Form.Item>
                    
                    <Form.Item
                        className="margin-bottom-30px"
                        name='Password'
                        rules={[{ required: true, message: 'Please enter your password!'}]}
                    >
                        <Input.Password className="padding-6px" autoComplete="off" type="text" name="loginPasswordInput" key="loginPasswordInput" placeholder="Password"/>
                    </Form.Item>
                    
                    <Button ghost type="default" variant="filled" onClick={handleSubmit} name="loginSubmitButton" key="loginSubmitButton">Sign In</Button>                    
                    <h6>
                        <Link key="DontHaveAccount" to={'/sign-up'} className="link-text">Don't have an account?</Link>
                    </h6> 
                </Form>
            </div>            
        </div>
    )
}

export default SignInForm
