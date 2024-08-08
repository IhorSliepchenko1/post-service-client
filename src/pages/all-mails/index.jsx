import MailsRender from "../../components/mail-render";
// import {
//   mailsCountLimit,
//   mailsDataAll,
// } from "../../features/mails/mailsSlice";
// import { useMethod } from "../../hooks/useMethod";
// import { useSelector } from "react-redux";

const AllMails = () => {
  // const state = useSelector((state) => state);
  // const { getPages } = useMethod();

  return (
    <MailsRender

    // get={getPages}
    // countMails={state.mailsAll.mailsCount}
    // mailsData={state.mailsAll.mailsDataAll}
    // mailsDataCurrent={mailsDataAll}
    // countMailsDispatch={mailsCountLimit}
    />
  );
};

export default AllMails;
