import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import styles from "./Toast.module.css";
import { VARIANT_OPTIONS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden/index";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, onClose, children }) {
  if (typeof variant !== "string") {
    throw new Error("Variant may only be of type string");
  }

  if (!VARIANT_OPTIONS.includes(variant)) {
    throw new Error(
      `A not valid variant for Toast has been chosen, allowed variants are: ${VARIANT_OPTIONS}`
    );
  }

  const closeButtonRef = React.useRef();

  React.useEffect(() => {
    closeButtonRef.current.focus();
  }, []);

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon variant={variant} size={24} />
      </div>
      <p className={styles.content}>
        {children}
        <VisuallyHidden> {variant} -</VisuallyHidden>
      </p>
      <button
        ref={closeButtonRef}
        className={styles.closeButton}
        aria-label="Dismiss message"
        aria-live="off"
        onClick={onClose}
      >
        <X size={24} />
      </button>
    </div>
  );
}

function Icon({ variant, ...delegated }) {
  const IconByVariant = ICONS_BY_VARIANT[variant];
  return <IconByVariant {...delegated} />;
}

export default Toast;
