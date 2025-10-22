import { toast, ToastOptions } from "react-hot-toast";

const baseStyle: ToastOptions = {
  duration: 3000,
  position: "top-right",
  style: {
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: 500,
    color: "#fff",
  },
};

export const toastSuccess = (message: string) =>
  toast.success(message, {
    ...baseStyle,
    style: { ...baseStyle.style, background: "#16a34a" },
});

export const toastError = (message: string) =>
  toast.error(message, {
    ...baseStyle,
    style: { ...baseStyle.style, background: "#dc2626" },
});

export const toastInfo = (message: string) =>
  toast(message, {
    ...baseStyle,
    style: { ...baseStyle.style, background: "#3b82f6" },
});