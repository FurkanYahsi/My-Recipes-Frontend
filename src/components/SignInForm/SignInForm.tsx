import { Form, Input } from "antd";
import useSignInForm from './SignInForm.logic';
import '../../styles.css'
import './SignInForm.css'

interface SignInFormProps {
  whichState: string;
  clear?: boolean;
}

const SignInForm:React.FC<SignInFormProps> = ({whichState, clear}) => {

    const {form, handleSubmit, contextHolder} = useSignInForm();

    if (!clear) {
        form.resetFields();
    }
    return (
        <div className={`form-container sign-in-container${whichState === "signUp" ? " move-left" : ""}`}>
                {contextHolder}
                <Form
                    form={form}
                    name="basic"
                    key="loginForm"
                    onFinish = {handleSubmit}>
                    <h2 >Sign In</h2>
                    <Form.Item
                        name='Email'
                        rules={[{ required: true, message: 'Please enter your email!'}]}
                    >
                        <Input className="input" autoComplete="on" type="text" placeholder="Email"/>
                    </Form.Item>
                    
                    <Form.Item
                        name='Password'
                        rules={[{ required: true, message: 'Please enter your password!'}]}
                    >
                        <Input.Password className="input" autoComplete="off" type="text" placeholder="Password"/>
                    </Form.Item>
                    
                    <div className="button-link">
                        <a className="link" href={'/sign-up'} >Forgot your password?</a>
                        <button onClick={handleSubmit} >Sign In</button>
                    </div>        
                </Form>
        </div>
    )
}

export default SignInForm
