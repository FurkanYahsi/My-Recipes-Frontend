import { Button, Form, Input } from "antd";
import './SignUpForm.css'
import {Link} from "react-router-dom";
import useSignUpForm from "./SignUpForm.logic";

const SignUpForm = () => {
  const {contextHolder,form,handleSubmit} = useSignUpForm()

  return (
    <div className='full-background'>
      <div className="form-box">
        {contextHolder}
        <div className="card-body">
          <Form
            form={form}
            name="basic"
            key="signupForm"
            labelCol={{ span: '24' }}
            wrapperCol={{ span: '24px' }}
            onFinish = {handleSubmit}>

                <h2 className="header-text">My Recipes</h2>

              {/* Name Input */}
              <Form.Item
                className="margin-bottom-30px"
                name='Name'
                hasFeedback
                rules={[{ required: true, message: 'Please enter your name!'}]}
              >
                <Input className="padding-6px" type="text" placeholder='Name' name="signupNameInput" key="signupNameInput"/>
              </Form.Item>

               {/* Surname Input */}
              <Form.Item
                className="margin-bottom-30px"
                name='Surname'
                hasFeedback
                rules={[{ required: true, message: 'Please enter your surname!'}]}
              >
                <Input className="padding-6px" type="text" placeholder='Surname' name="signupSurnameInput" key="signupSurnameInput"/>
              </Form.Item>

              {/* Email Input */}
              <Form.Item
                className="margin-bottom-30px"
                name="Email"
                hasFeedback
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not a valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please enter your E-mail!',
                  },
                ]}
              >
                <Input className="padding-6px" placeholder='Email' name="signupEmailInput" key="signupEmailInput"/>
              </Form.Item>

              {/* Password Input */}
              <Form.Item
                className="margin-bottom-30px"
                name='Password'
                hasFeedback
                rules={[{ required: true, message: 'Please enter your password!'}]}
              >
                <Input.Password className="padding-6px" autoComplete="off" type="text" placeholder="Password" name="signupPasswordInput" key="signupPasswordInput"/>
              </Form.Item>

              {/* Again Password Input */}
             <Form.Item
                className="margin-bottom-30px"
                name="PasswordConfirmation"
                dependencies={['Password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('Password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password className="padding-6px" placeholder="Confirm Password" name="signupConfirmPasswordInput" key="signupConfirmPasswordInput"/>
              </Form.Item>

              {/* Submit Button */}
            <Button ghost type="default" variant="filled" onClick={handleSubmit} name="loginSubmitButton" key="loginSubmitButton">Sign Up</Button>                    

            <h6>         
                <Link key="haveAccount" to={'/sign-in'} className="link-text">Have an account?</Link>
            </h6> 
          </Form>
        </div>
               
      </div>   
    </div>
  )
}
export default SignUpForm
