import { toast } from "react-toastify";
export default function toastMsg(status, message, settings) {
  //todo: capitalize the error
  toast[status](
    message,
    settings
      ? settings
      : {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
        }
  );
}
