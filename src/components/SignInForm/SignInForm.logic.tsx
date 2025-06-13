import { Form } from "antd";
import { ToastMessage } from "../../utils/ToastMessage/ToastMessage";


const useSignInForm = () => {
    const [form] = Form.useForm();
      const {contextHolder, showNotification} = ToastMessage();

      
    const handleSubmit = () => {
    form.validateFields().then((values)=> {
        
    }).catch((error)=> {      
      (error.errorFields as Array<{ name: (string)[] }>).forEach((item) => {
        showNotification(item.name[0] + " cannot be blank!")
      })
    })
  }


  return {
    form,
    handleSubmit,
    contextHolder
  }
   
  
}

export default useSignInForm
