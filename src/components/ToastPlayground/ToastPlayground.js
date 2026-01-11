import React, { useRef } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";
import { VARIANT_OPTIONS } from "../../constants";
import { ToastContext } from "../ToastProvider/ToastProvider";

function ToastPlayground() {
  const { message, setMessage, chosenVariant, setChosenVariant, createToast } =
    React.useContext(ToastContext);

  const inputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    if (message.length < 1) {
      return;
    }

    createToast(message);

    setMessage("");
  }

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  React.useEffect(() => {
    inputRef.current.focus();
  }, [createToast]);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form
        onSubmit={(event) => handleSubmit(event)}
        className={styles.controlsWrapper}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              ref={inputRef}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => (
              <label key={variant} htmlFor={`variant-${variant}`}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={variant === chosenVariant}
                  onChange={(event) => setChosenVariant(event.target.value)}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
