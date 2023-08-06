import React, { HTMLAttributes, useRef } from "react";

import styles from "./Modal.module.scss";

interface Props extends HTMLAttributes<HTMLDialogElement> {
  dialogDescription: string;
  isOpen?: boolean;
  onClose: () => void;
  dialogTitle: string;
}

const Modal = ({
  children,
  dialogDescription,
  isOpen,
  onClose,
  dialogTitle,
  ...rest
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  const focusableElements = ref?.current?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<
    | HTMLAnchorElement
    | HTMLButtonElement
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
  >;

  const firstElement = focusableElements?.[0];
  const lastElement = focusableElements?.[focusableElements.length - 1];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (isOpen) {
    document.body.setAttribute("style", "overflow: hidden;");
    ref.current?.showModal();
  } else {
    document.body.removeAttribute("style");
    ref.current?.close();
  }

  return (
    <dialog
      ref={ref}
      aria-describedby="dialogDescription"
      aria-labelledby="dialogTitle"
      className={styles.component}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <h2 id="dialogTitle" className={styles.dialogTitle}>
        {dialogTitle}
      </h2>
      <p id="dialogDescription" className={styles.dialogDescription}>
        {dialogDescription}
      </p>
      <div className={styles.closeButtonWrapper}>
        <button
          aria-label="Close modal"
          className={styles.closeButton}
          onClick={onClose}
        >
          X
        </button>
      </div>
      {children}
    </dialog>
  );
};

export default Modal;
