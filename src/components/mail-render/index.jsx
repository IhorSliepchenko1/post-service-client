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

import { useDispatch } from "react-redux";
import { FaDownload } from "react-icons/fa";
import { useCreateFile } from "./../../hooks/useCreateFile";
import { useConvertDate } from "./../../hooks/useConverDate";
import ModalMailContent from "../../components/modal-mail";
import { BASE_URL } from "../../config";

const MailsRender = ({
  api,
  get,
  countMails,
  mailsData,
  mailsDataCurrent,
  countMailsDispatch,
}) => {
  const dispatch = useDispatch();

  const { createFile } = useCreateFile();
  const { formatDate } = useConvertDate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [contentMails, setContentMails] = useState({
    contentMails: "",
    subject: "",
    date: "",
    sender: "",
    recipient: "",
  });

  const pages = Math.ceil(countMails / 10);

  const items = useMemo(() => {
    return mailsData;
  }, [page, mailsData, countMails]);

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

  const getMails = async () => {
    try {
      setLoading(true);
      const response = await get(api, 10, page);

      const respData = response.data.mails.map((mail) => ({
        ...mail,
        createdAt: formatDate(mail.createdAt),
      }));

      dispatch(mailsDataCurrent(respData));
      dispatch(countMailsDispatch(response.data.limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMails();
  }, [page]);

  let csvData = [["date", "from", "name", "to", "subject", "content"]];

  const fileGenerate = (array) => {
    array.forEach((item) => {
      let content = item.content.split(`\n`).filter((el) => el !== "");

      csvData.push([
        item.createdAt,
        item.from,
        item.name,
        item.to,
        item.subject,
        ...content,
      ]);
    });

    createFile(csvData, `${Date.now()}`);
    csvData = [["date", "from", "name", "to", "subject", "content"]];
  };

  const downloadAllPages = async () => {
    const response = await await get(api);

    const respData = response.data.mails.map((mail) => ({
      ...mail,
      createdAt: formatDate(mail.createdAt),
    }));

    fileGenerate(respData);
    return response;
  };

  return (
    <div className="flex flex-col justify-center container-table gap-2">
      <div>
        <div className="p-1">Mails send: {countMails}</div>
        <div className="flex gap-2 items-center">
          <Button
            color="primary"
            endContent={<FaDownload />}
            onClick={downloadAllPages}
          >
            Download all pages
          </Button>

          <Button
            color="warning"
            endContent={<FaDownload />}
            onClick={() => fileGenerate(mailsData)}
          >
            Download current page
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
          <TableColumn key="createdAt">DATE</TableColumn>
          <TableColumn key="btn_content">CONTENT</TableColumn>
          <TableColumn key="from">SENDER</TableColumn>
          <TableColumn key="to">RECIPIENT</TableColumn>
          <TableColumn key="subject">SUBJECT</TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          loadingContent={<Spinner label="Loading..." color="warning" />}
          loadingState={loading ? "loading" : "idle"}
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
                      check mail
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
