import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage/ToastMessage";
import { hashPassword } from "../../utils/CryptoJS/CryptoJS";
import { signIn } from '../../services/AuthServices/AuthService.export';

const useSignInForm = () => {
  const [form] = Form.useForm();
  const {contextHolder, showNotification} = ToastMessage();
  const navigate = useNavigate();
    
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const hashedPassword = hashPassword(values.Password);
      values.Password = hashedPassword;

      signIn(values).then((response:any) => {
        if (response && response.success) {
          navigate("/home");
        } else {
          showNotification(response?.errorMessage || "Sign in failed!");
        }
      }).catch((error) => {console.log(error.response?.data)});
      
    } catch (error : any) {
      if (error.errorFields) {
        showNotification(
          error.errorFields.map((item: any) => (
            <div key={item.name[0]}>{item.errors[0]}</div>
          )) 
        );
      }
      else if (error.response && error.response.data) {
        showNotification(error.response.data);
      }
    }
  }

  return {
    form,
    handleSubmit,
    contextHolder
  }
}

export default useSignInForm
