import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = (props) => {
  return toast(props.title, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: props.type,
    transition: Bounce,
  });
};

export default Notification;
