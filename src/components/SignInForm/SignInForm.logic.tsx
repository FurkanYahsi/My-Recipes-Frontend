import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage/ToastMessage";
import axios from "axios";

const useSignInForm = () => {
  const [form] = Form.useForm();
  const {contextHolder, showNotification} = ToastMessage();
  const navigate = useNavigate();
    
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("http://localhost:3000/api/auth/sign-in", values);
      navigate("/home");
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
