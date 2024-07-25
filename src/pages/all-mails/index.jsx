import MailsRender from "../../components/mail-render";
import {
  mailsCountLimit,
  mailsDataAll,
} from "../../features/all-mails/allMailsSlice";
import { useMethod } from "../../hooks/useMethod";
import { useSelector } from "react-redux";

const AllMails = () => {
  const state = useSelector((state) => state);
  const { mailsGet } = useMethod();

  return (
    <MailsRender
      api={`mails`}
      allMaillApi={`mails`}
      get={mailsGet}
      countMails={state.mailsAll.mailsCount}
      mailsData={state.mailsAll.mailsDataAll}
      mailsDataCurrent={mailsDataAll}
      countMailsDispatch={mailsCountLimit}
    />
  );
};

export default AllMails;
