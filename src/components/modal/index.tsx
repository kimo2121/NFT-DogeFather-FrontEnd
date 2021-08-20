import { Modal } from 'react-bootstrap';
import './index.scss';

interface PropsType {
  show: boolean;
  onHide?: Function;
  label?: any;
  border?: boolean;
  children: any;
  className?: string;
}
const Dialog = (props: PropsType) => {
  return (
    <Modal
      size="sm"
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      centered
      aria-labelledby="contained-modal-title-vcenter"
      className={`shadow dialog-frame ${props.className}`}
    >
      <Modal.Header className={props.border && 'border'} closeButton>
        {props.label}
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};
export default Dialog;
