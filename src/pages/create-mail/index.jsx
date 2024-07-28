import { useMethod } from "../../hooks/useMethod";
import { useState } from "react";
import { useSelector } from "react-redux";
import CreateMailPanel from "../../components/create-mail-panel";

const CreateMails = () => {
  const state = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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
      const response = await createMails(mailsInfo, info, selectedFile);

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

  return (
    <div className="mail-container">
      <CreateMailPanel
        subject={mailsInfo.subject}
        to={mailsInfo.to}
        content={mailsInfo.content}
        changeHandlerMailsInfo={changeHandlerMailsInfo}
        loading={loading}
        handleSubmit={handleSubmit}
        setSelectedFile={setSelectedFile}
      />
    </div>
  );
};

export default CreateMails;
