import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage/ToastMessage";

const useSignUpForm = () => {
  const [form] = Form.useForm();
  const { contextHolder, showNotification } = ToastMessage();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!arePasswordsSame(values)) {
        throw new Error("Error-PasswordsAreNotSame");
      }

      localStorage.setItem("currentUser", "guest");
      navigate("/home");

    } catch (error: any) {
      if (error.errorFields) {
        showNotification(
          error.errorFields.map((item: any) => (
            <div key={item.name[0]}>{item.errors[0]}</div>
          ))
        );
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
