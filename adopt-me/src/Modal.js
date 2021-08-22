import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/* secondary render point used exclusively for modals */
const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  // refs are state that survive between renders. typically used for referencing html nodes.
  const ref = useRef(null);
  // only create one if there isn't one.
  if (!ref.current) {
    ref.current = document.createElement("div");
  }

  // anything appended to the DOM needs to be cleaned up
  useEffect(() => {
    modalRoot.appendChild(ref.current);
    return () => modalRoot.removeChild(ref.current);
  }, []);

  // It works similar to ReactDOM.render(elements, renderPoint)
  return createPortal(<div>{children}</div>, ref.current);
};

export default Modal;
