import { toast } from "react-toastify";

export const successToast = (message: string, duration?: number) =>
  toast.success(message, { autoClose: duration ? duration : 5000 });

export const errorToast = (message: string, duration?: number) =>
  toast.error(message, { autoClose: duration ? duration : 5000 });

export const warningToast = (message: string, duration?: number) =>
  toast.warning(message, { autoClose: duration ? duration : 5000 });
