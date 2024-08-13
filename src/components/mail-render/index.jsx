import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Spinner,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { FaDownload } from "react-icons/fa";
import { useCreateFile } from "./../../hooks/useCreateFile";
import { useConvertDate } from "./../../hooks/useConverDate";
import ModalMailContent from "../../components/modal-mail";
import { fetchMails } from "../../features/mails/mailsSlice";
import { fetchDownloadFile } from "../../features/download-file-page/downloadFileSlice";
import { useTheme } from "../../context";
import { list } from "../../languages";

const MailsRender = ({ api }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data, count, status } = state.mails;
  const { createFile } = useCreateFile();
  const { formatDate } = useConvertDate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = useState(1);

  const { token, userId } = useSelector((state) => state.auth.userData);

  const { language } = useTheme();

  useEffect(() => {
    dispatch(fetchMails({ jwt: token, limit: 10, page, id: userId, api }));
  }, [page]);

  const [contentMails, setContentMails] = useState({
    contentMails: "",
    subject: "",
    date: "",
    sender: "",
    recipient: "",
  });

  const pages = Math.ceil(count / 10);

  const items = useMemo(() => {
    return data.map((mail) => ({
      ...mail,
      createdAt: formatDate(mail.createdAt),
    }));
  }, [data, language]);

  const contentValues = (contentData) => {
    setContentMails({
      contentMails: contentData.content,
      subject: contentData.subject,
      date: contentData.createdAt,
      sender: contentData.from,
      recipient: contentData.to,
      pdfUrl: contentData.pdfUrl,
    });
  };

  let csvData = [["date", "from", "name", "to", "subject", "content"]];

  const fileGenerate = (array) => {
    array.map((item) => {
      let content = item.content.replace(/[\r\n]+/g, "");

      csvData.push([
        item.createdAt,
        item.from,
        item.name,
        item.to,
        item.subject,
        content,
      ]);
    });

    createFile(csvData, `${Date.now()}`);
    csvData = [["date", "from", "name", "to", "subject", "content"]];
  };

  return (
    <div className="flex flex-col justify-center container-table gap-2">
      <div>
        <div className="p-1">
          {list[language].mails_send}: {count}
        </div>
        <div className="flex gap-2 items-center">
          <Button
            color="primary"
            endContent={<FaDownload />}
            onClick={() =>
              dispatch(
                fetchDownloadFile({
                  api,
                  jwt: token,
                  id: userId,
                  formatDate,
                  fileGenerate,
                })
              )
            }
          >
            {list[language].download_all}
          </Button>

          <Button
            color="warning"
            endContent={<FaDownload />}
            onClick={() => fileGenerate(data)}
          >
            {list[language].download_current}
          </Button>
        </div>
      </div>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          pages > 0 ? (
            <div className="flex justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="createdAt">{list[language].createdAt}</TableColumn>
          <TableColumn key="btn_content">
            {list[language].btn_content}
          </TableColumn>
          <TableColumn key="from"> {list[language].from}</TableColumn>
          <TableColumn key="to">{list[language].to}</TableColumn>
          <TableColumn key="subject">{list[language].subject}</TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          loadingContent={<Spinner label="Loading..." color="warning" />}
          loadingState={status === "loading" ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "btn_content" ? (
                    <Button
                      size="sm"
                      onPress={onOpen}
                      onClick={() => contentValues(item)}
                    >
                      {list[language].check_mail}
                    </Button>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ModalMailContent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        contentMails={contentMails.contentMails}
        subject={contentMails.subject}
        date={contentMails.date}
        sender={contentMails.sender}
        recipient={contentMails.recipient}
        file={contentMails.pdfUrl}
      />
    </div>
  );
};
export default MailsRender;
