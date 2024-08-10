import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
} from "@nextui-org/react";
import { useDownloadFile } from "../../hooks/useDownloadFile";

const ModalMailContent = ({
  isOpen,
  onOpenChange,
  contentMails,
  subject,
  date,
  sender,
  recipient,
  file,
}) => {
  const { downloadFile } = useDownloadFile();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between p-1">
                <h3>{subject}</h3>
                <span>{date}</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <p>
                <strong>sender: </strong>
                {sender}
              </p>
              <p>
                <strong>recipient: </strong>
                {recipient}
              </p>
              {file ? (
                <Button onClick={() => downloadFile(file)}>
                  Download File
                </Button>
              ) : (
                <></>
              )}
              <Divider />
              {contentMails}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalMailContent;
