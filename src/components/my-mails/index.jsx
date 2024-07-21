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
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { mailsDataCurrentUser } from "../../features/mails/mailsSlice";
import { useMethod } from "../../hooks/useMethod";

const MyMails = () => {
  const dispatch = useDispatch();
  const dataMails = useSelector((state) => state.mails.mailsData);

  const token = useSelector((state) => state.auth.jwt);
  const userId = useSelector((state) => state.auth.id);

  const { universalGet } = useMethod();

  const getMails = async () => {
    const response = await universalGet(token, userId, `my-mails`);
    dispatch(mailsDataCurrentUser(response.data));
  };

  useEffect(() => {
    getMails();
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(dataMails.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return dataMails.slice(start, end);
  }, [page, dataMails]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
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

      <TableBody items={items}>
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
