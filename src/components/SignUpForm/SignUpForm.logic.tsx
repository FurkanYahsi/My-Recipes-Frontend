import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage/ToastMessage";
import { hashPassword } from "../../utils/CryptoJS/CryptoJS";
import { signUp } from "../../services/AuthServices/AuthService.export";
import { useEffect } from "react";

const useSignUpForm = (clear:boolean) => {
  const [form] = Form.useForm();
  const { contextHolder, showNotification } = ToastMessage();
  const navigate = useNavigate();

  useEffect(() => {
    form.resetFields();
  }, [clear]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!arePasswordsSame(values)) {
        throw new Error("Error-PasswordsAreNotSame");
      }
      const hashedPassword = hashPassword(values.Password);

      values.Password = hashedPassword;
      delete values.PasswordConfirmation; //Unnecessary for the backend

        signUp(values).then((response:any) => {
          if (response && response.success) {
            navigate("/home");
          } else {
            showNotification(response?.errorMessage || "Sign up failed!");
          }
        });     

    } catch (error: any) {
      if (error.errorFields) {
        showNotification(
          error.errorFields.map((item: any) => (
            <div key={item.name[0]}>{item.errors[0]}</div>
          ))
        );
      } else if (error.response && error.response.data) {
        showNotification(error.response.data);
      }
    }
  };

  const arePasswordsSame = (values: any): boolean => {
    if (values.Password !== values.PasswordConfirmation) {
      showNotification("The passwords are not same!");
      return false;
    }
    return true;
  };

   return {
    contextHolder,
    form,
    handleSubmit,
  }
};

export default useSignUpForm;
