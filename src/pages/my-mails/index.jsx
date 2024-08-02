import MailsRender from "../../components/mail-render";
import { useMethod } from "../../hooks/useMethod";
import { useSelector } from "react-redux";
import { mailsDataCurrentUser } from "../../features/mails/mailsSlice";
import { countMailsUser } from "../../features/current/currentSlice";

const MyMails = () => {
  const state = useSelector((state) => state);
  const { getPages } = useMethod();
  return (
    <MailsRender
      api={`my-mails`}
      get={getPages}
      countMails={state.currentSlice.countMails}
      mailsData={state.mails.mailsData}
      mailsDataCurrent={mailsDataCurrentUser}
      countMailsDispatch={countMailsUser}
    />
  );
};

export default MyMails;
