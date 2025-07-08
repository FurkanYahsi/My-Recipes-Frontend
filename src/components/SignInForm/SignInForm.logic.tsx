import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage/ToastMessage";
import { hashPassword } from "../../utils/CryptoJS/CryptoJS";
import { signIn } from '../../services/AuthServices/AuthService.export';
import { useEffect } from "react";

const useSignInForm = (clear : boolean) => {
  const [form] = Form.useForm();
  const {contextHolder, showNotification} = ToastMessage();
  const navigate = useNavigate();
    
  useEffect(()=>{
    form.resetFields();
  }, [clear])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const hashedPassword = hashPassword(values.Password);
      values.Password = hashedPassword;

      signIn(values).then((response:any) => {
        if (response && response.success) {
          navigate("/home");
        } else {
          showNotification(response?.errorMessage || "Sign in failed!", "error");
        }
      }).catch((error) => {console.log(error.response?.data)});
      
    } catch (error : any) {
      if (error.errorFields) {
        showNotification(
          error.errorFields.map((item: any) => (
            <ul><li key={item.name[0]}>{item.errors[0]}</li></ul>
          )),
          "error" 
        );
      }
      else if (error.response && error.response.data) {
        showNotification(error.response.data, "error");
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
