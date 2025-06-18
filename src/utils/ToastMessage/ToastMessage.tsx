import { notification } from "antd";
import './ToastMessage.css';

export const ToastMessage = () => {

    const [api, contextHolder] = notification.useNotification();

    const showNotification = (description:string) => {
        api.open({
            className:'toastMessageBackground',
            message:"",
            description: description,
            placement:"bottomLeft",
            duration:3,
        })
    }
    return {contextHolder, showNotification};
}

