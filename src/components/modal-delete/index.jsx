import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from "@nextui-org/react";

const ModalDeleteProfile = ({ isOpen, handleDelete, onClose }) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Delete alert!</ModalHeader>
            <ModalBody>
              <h3>Are you sure you want to delete this user?</h3>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose} onClick={handleDelete}>
                Yes
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                No
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteProfile;
