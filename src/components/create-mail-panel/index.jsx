import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../components/error-message";

const CreateMailPanel = ({
  subject,
  to,
  content,
  changeHandlerMailsInfo,
  loading,
  handleSubmit,
  setSelectedFile,
}) => {
  const state = useSelector((state) => state);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Card className="card-mails">
      <CardHeader className="flex flex-col gap-3">
        <Input
          type="text"
          variant="flat"
          label="Email subject"
          name="subject"
          color="primary"
          value={subject}
          onChange={changeHandlerMailsInfo}
        />
        <Input
          type="email"
          variant="flat"
          label="Email sender"
          color="primary"
          name="to"
          value={to}
          onChange={changeHandlerMailsInfo}
        />
      </CardHeader>
      <CardBody className="flex flex-col gap-3 min-h-56">
        <Divider />
        <Textarea
          variant="bordered"
          placeholder="Enter your email text..."
          disableAnimation
          disableAutosize
          name="content"
          value={content}
          onChange={changeHandlerMailsInfo}
          classNames={{
            input: "resize-y min-h-[400px] textarea",
          }}
        />
        <input type="file" name="file" onChange={handleFileChange} />
        <ErrorMessage error={state.error.value} />
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button color="primary" isLoading={loading} onClick={handleSubmit}>
          Send
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateMailPanel;
