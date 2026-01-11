import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const initialVariant = "notice";
  const [message, setMessage] = React.useState("");
  const [chosenVariant, setChosenVariant] = React.useState(initialVariant);
  const [toasts, setToasts] = React.useState([]);

  useEscapeKey(() => setToasts([]));

  function createToast(message) {
    const newToast = {
      id: crypto.randomUUID(),
      variant: chosenVariant,
      message: message,
    };
    setToasts([...toasts, newToast]);
  }

  function dismissToast(toastToDismiss) {
    const filteredToasts = toasts.filter((toast) => {
      return toast !== toastToDismiss;
    });

    setToasts(filteredToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        initialVariant,
        message,
        setMessage,
        chosenVariant,
        setChosenVariant,
        toasts,
        dismissToast,
        createToast,
      }}
    >
      <>{children}</>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
