import { Modal, Button } from "react-bootstrap";

const CustomModel = (props) => {
  const { title, visible, onClose, onSave, children } = props;
  return (
    <Modal show={visible} onHide={onClose}>
      <Modal.Header closeButton id="custom-modal">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModel;
