import { FC } from "react";
import "./style.scss";

interface ModalPropTypes {
  isShow: boolean;
  children?: any;
  onClose?: () => void;
}

const Modal: FC<ModalPropTypes> = ({
  isShow,
  children,
  onClose = () => {},
}) => {
  return (
    <>
      {isShow && (
        <div className="glob-modal-comp">
          <div className="bg-layer" />
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={onClose}>Close</button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
