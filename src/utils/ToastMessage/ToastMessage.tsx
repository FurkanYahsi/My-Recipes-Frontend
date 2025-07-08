import { notification } from "antd";
import './ToastMessage.css';

export const ToastMessage = () => {

    const [api, contextHolder] = notification.useNotification();

    const showNotification = (description:string, type?:string) => {

        switch (type) {
            case "success":
                api.success({
                    className: 'toastMessageBackground success',
                    message: "",
                    description: description,
                    placement: "bottomLeft",
                    duration: 3,
                });
                break;
            case "error":
                api.error({
                    className: 'toastMessageBackground error',
                    message: "",
                    description: description,
                    placement: "bottomLeft",
                    duration: 3,
                });
                break;
            case "warning":
                api.warning({  
                    className: 'toastMessageBackground warning',
                    message: "",
                    description: description,
                    placement: "bottomLeft",
                    duration: 3,
                });
                break;            
            default:
                api.open({
                    className: 'toastMessageBackground',
                    message: "",
                    description: description,
                    placement: "bottomLeft",
                    duration: 3,
                });
                break;
        }
    }
    return {contextHolder, showNotification};
}

