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
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { mailsDataCurrentUser } from "../../features/mails/mailsSlice";
import { useMethod } from "../../hooks/useMethod";

const MyMails = () => {
  const dispatch = useDispatch();
  const dataMails = useSelector((state) => state.mails.mailsData);
  const { mailsGet } = useMethod();

  const [page, setPage] = useState(1);
  const [countString, setCountString] = useState(10);
  const [loading, setLoading] = useState(true);

  const pages = Math.ceil(countString / 10);

  const items = useMemo(() => {
    const start = 0;
    const end = countString;
    return dataMails.slice(start, end);
  }, [page, dataMails, countString]);

  const getMails = async () => {
    setLoading(true);
    const response = await mailsGet(`my-mails`, 10, page);
    setCountString(response.data.limit);

    dispatch(mailsDataCurrentUser(response.data.mails));
    setLoading(false);
  };
  useEffect(() => {
    getMails();
  }, [page, countString]);

  return (
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
        <TableColumn key="from">SENDER</TableColumn>
        <TableColumn key="to">RECIPIENT</TableColumn>
        <TableColumn key="subject">SUBJECT</TableColumn>
        <TableColumn key="createdAt">DATE</TableColumn>
      </TableHeader>
      <TableBody
        items={items}
        loadingContent={<Spinner label="Loading..." color="warning" />}
        loadingState={loading ? "loading" : "idle"}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MyMails;
