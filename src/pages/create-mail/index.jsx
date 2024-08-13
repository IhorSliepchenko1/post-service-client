import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Textarea,
  Button,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "../../components/error-message";
import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from "react";
import InputBasic from "../../components/input";
import { fetchCreateMail } from "../../features/create-mail/createMailSlice";
import { useTheme } from "../../context";
import { list } from "../../languages";

const CreateMails = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const jwt = state.auth.userData.token;
  const { status, error } = state.createMail;
  const { email, name, token, id } = state.currentSlice.userData;
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { language } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: `onChange`,

    reValidateMode: `onBlur`,

    defaultValues: {
      to: "",
      subject: "",
      content: "",
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
    try {
      const formData = new FormData();
      formData.append("from", email);
      formData.append("name", name);
      formData.append("token", token);
      formData.append("authorId", id);
      formData.append("to", data.to);
      formData.append("subject", data.subject);
      formData.append("content", data.content);
      if (file) {
        formData.append("file", file);
      }

      dispatch(fetchCreateMail({ formData, jwt }));

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
            label={list[language].theme}
            name="subject"
            type="text"
          />
          <InputBasic
            control={control}
            label={list[language].recipient}
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
          <ErrorMessage error={error} />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button
            color="primary"
            isLoading={status === `loading` ? true : false}
            type="submit"
          >
            {list[language].send}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreateMails;
