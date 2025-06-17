import { Form, Input } from "antd";
import '../../styles.css'
import useSignUpForm from "./SignUpForm.logic";

interface SignUpFormProps {
  whichState: string;
  clear?: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({whichState, clear}) => {
  const {contextHolder,form,handleSubmit} = useSignUpForm()

  if (!clear) {
    form.resetFields();
  }

  return (
    <div className={`form-container sign-up-container${whichState === "signIn" ? " move-right" : ""}`}>
      
        {contextHolder}
        <div >
          <Form
            form={form}>
              <h2 >Sign Up</h2>

              {/* Name Input */}
              <Form.Item
                name='Name'
                hasFeedback
                rules={[{ required: true, message: 'Please enter your name!'}]}
              >
                <Input className="input" autoComplete="on" type="text" placeholder='Name'/>
              </Form.Item>

               {/* Surname Input */}
              <Form.Item
                name='Surname'
                hasFeedback
                rules={[{ required: true, message: 'Please enter your surname!'}]}
              >
                <Input className="input" autoComplete="on" type="text" placeholder='Surname'/>
              </Form.Item>

              <Form.Item
                name='Username'
                hasFeedback
                rules={[{ required: true, message: 'Please enter an username!'}]}
              >
                <Input className="input" autoComplete="off" type="text" placeholder='Username'/>
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
                <Input className="input" autoComplete="on" placeholder='Email'/>
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
