import { Form, Input } from "antd";
import '../../styles.css'
import useSignUpForm from "./SignUpForm.logic";

const SignUpForm = () => {
  const {contextHolder,form,handleSubmit} = useSignUpForm()

  return (
    <div className="form-container sign-up-container">
      
        {contextHolder}
        <div >
          <Form
            form={form}
            onFinish = {handleSubmit}>

                <h2 >Sign Up</h2>

              {/* Name Input */}
              <Form.Item
                name='Name'
                hasFeedback
                rules={[{ required: true, message: 'Please enter your name!'}]}
              >
                <Input className="input" type="text" placeholder='Name'/>
              </Form.Item>

               {/* Surname Input */}
              <Form.Item
                name='Surname'
                hasFeedback
                rules={[{ required: true, message: 'Please enter your surname!'}]}
              >
                <Input className="input" type="text" placeholder='Surname'/>
              </Form.Item>

              {/* Email Input */}
              <Form.Item
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
                <Input className="input" placeholder='Email'/>
              </Form.Item>

              {/* Password Input */}
              <Form.Item
                name='Password'
                hasFeedback
                rules={[{ required: true, message: 'Please enter your password!'}]}
              >
                <Input.Password className="input" autoComplete="off" type="text" placeholder="Password"/>
              </Form.Item>

              {/* Again Password Input */}
             <Form.Item
                name='PasswordConfirmation'
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
                <Input.Password className="input" autoComplete="off" type="text" placeholder="Confirm Password"/>
              </Form.Item>

              {/* Submit Button */}
            <button onClick={handleSubmit}>Sign Up</button>                    
          </Form>
        </div>

    </div>
  )
}
export default SignUpForm
