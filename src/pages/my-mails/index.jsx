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
import { mailsDataCurrentUser } from "../../features/mails/mailsSlice";
import { useMethod } from "../../hooks/useMethod";
import { FaDownload } from "react-icons/fa";
import { useCreateFile } from "./../../hooks/useCreateFile";
import { useConvertDate } from "./../../hooks/useConverDate";
import ModalMailContent from "../../components/modal-mail";

const MyMails = () => {
  const dispatch = useDispatch();
  const dataMails = useSelector((state) => state.mails.mailsData);

  const { mailsGet } = useMethod();
  const { createFile } = useCreateFile();
  const { formatDate } = useConvertDate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [page, setPage] = useState(1);
  const [countString, setCountString] = useState(10);
  const [loading, setLoading] = useState(true);
  const [contentMails, setContentMails] = useState({
    contentMails: "",
    subject: "",
    date: "",
    sender: "",
    recipient: "",
  });

  const pages = Math.ceil(countString / 10);

  const items = useMemo(() => {
    return dataMails;
  }, [page, dataMails, countString]);

  const contentValues = (contentData) => {
    setContentMails({
      contentMails: contentData.content,
      subject: contentData.subject,
      date: contentData.createdAt,
      sender: contentData.from,
      recipient: contentData.to,
    });
  };

  const getMails = async () => {
    setLoading(true);
    const response = await mailsGet(`my-mails`, 10, page);

    const respData = response.data.mails.map((mail) => ({
      ...mail,
      createdAt: formatDate(mail.createdAt),
    }));

    dispatch(mailsDataCurrentUser(respData));
    setCountString(response.data.limit);
    setLoading(false);
  };

  useEffect(() => {
    getMails();
  }, []);

  let csvData = [["date", "from", "name", "to", "subject", "content"]];

  const fileGenerate = (array) => {
    array.forEach((item) => {
      let content = item.content.split(`\n`).filter((el) => el !== "");

      csvData.push([
        formatDate(item.createdAt),
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
    const response = await mailsGet(`my-mails`);
    fileGenerate(response.data.mails);
    return response;
  };

  return (
    <div className="flex flex-col justify-center container-table gap-2">
      <div>
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
            onClick={() => fileGenerate(dataMails)}
          >
            Download current page
          </Button>
        </div>
      </div>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
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
      />
    </div>
  );
};

export default MyMails;
