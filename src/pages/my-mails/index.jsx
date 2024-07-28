import MailsRender from "../../components/mail-render";
import { useMethod } from "../../hooks/useMethod";
import { useSelector } from "react-redux";
import { mailsDataCurrentUser } from "../../features/mails/mailsSlice";
import { countMailsUser } from "../../features/current/currentSlice";

const MyMails = () => {
  const state = useSelector((state) => state);
  const { getWithParams } = useMethod();
  console.log(state.mails.mailsData);
  return (
    <MailsRender
      api={`my-mails`}
      get={getWithParams}
      countMails={state.currentSlice.countMails}
      mailsData={state.mails.mailsData}
      mailsDataCurrent={mailsDataCurrentUser}
      countMailsDispatch={countMailsUser}
    />
  );
};

export default MyMails;
