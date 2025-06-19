import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage/ToastMessage";
import AxiosInstance from "../../api/AxiosInstance";

const useSignInForm = () => {
  const [form] = Form.useForm();
  const {contextHolder, showNotification} = ToastMessage();
  const navigate = useNavigate();
    
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await AxiosInstance.post("/auth/sign-in", values);
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
