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
import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from "react";
import { useMethod } from "../../hooks/useMethod";
import InputBasic from "../../components/input";

const CreateMails = () => {
  const state = useSelector((state) => state);
  const { createMails } = useMethod();
  const { email, token, name, id } = state.currentSlice.currentData;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: `onChange`,
    reValidateMode: `onBlur`,
    defaultValues: {
      from: email,
      name: name,
      email: email,
      token: token,
      authorId: id,
      to: "",
      subject: "",
      content: "",
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await createMails(data, file);
      setLoading(false);
      reset();
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="mail-container" onSubmit={handleSubmit(onSubmit)}>
      <Card className="card-mails">
        <CardHeader className="flex flex-col gap-3">
          <InputBasic
            control={control}
            label="Тема письма"
            name="subject"
            type="text"
          />
          <InputBasic
            control={control}
            label="Получатель"
            name="to"
            type="email"
          />
        </CardHeader>
        <CardBody className="flex flex-col gap-3 min-h-56">
          <Divider />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                variant="bordered"
                color="success"
                classNames={{
                  input: "resize-y min-h-[400px] textarea",
                }}
              />
            )}
          />
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <ErrorMessage error={state.error.value} />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button color="primary" isLoading={loading} type="submit">
            Send
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateMails;
