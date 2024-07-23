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
import { useMethod } from "../../hooks/useMethod";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "../../components/error-message";
import { useSelector } from "react-redux";

const CreateMails = () => {
  const state = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [mailsInfo, setMailsInfo] = useState({
    to: "",
    subject: "",
    content: "",
  });

  const { createMails } = useMethod();
  const { email, token, name, id } = state.currentSlice.currentData;

  const info = {
    from: email,
    name: name,
    email: email,
    token: token,
    authorId: id,
  };

  const changeHandlerMailsInfo = (e) => {
    setMailsInfo({ ...mailsInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await createMails(mailsInfo, info);

      if (response) {
        setMailsInfo({
          to: "",
          subject: "",
          content: "",
        });
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [loading]);

  return (
    <Card className="mail-container">
      <CardHeader className="flex flex-col gap-3">
        <Input
          type="text"
          variant="flat"
          label="Email subject"
          name="subject"
          color="primary"
          value={mailsInfo.subject}
          onChange={changeHandlerMailsInfo}
        />
        <Input
          type="email"
          variant="flat"
          label="Email sender"
          color="primary"
          name="to"
          value={mailsInfo.to}
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
          value={mailsInfo.content}
          onChange={changeHandlerMailsInfo}
          classNames={{
            input: "resize-y min-h-[400px] textarea",
          }}
        />
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

export default CreateMails;
