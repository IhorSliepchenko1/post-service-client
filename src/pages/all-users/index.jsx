import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/all-users/allUsersSlice";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Spinner,
  Chip,
} from "@nextui-org/react";
import { useConvertDate } from "../../hooks/useConverDate";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context";
import { list } from "../../languages";

const AllUsers = () => {
  const { formatDate } = useConvertDate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { data, count, status } = state.users;
  const { token, userId } = state.auth.userData;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const pages = Math.ceil(count / 10);

  const { language } = useTheme();

  const items = useMemo(() => {
    return data.map((user) => ({
      ...user,
      createdAt: formatDate(user.createdAt),
    }));
  }, [page, state]);

  useEffect(() => {
    dispatch(fetchUsers({ jwt: token, limit: 10, page, id: userId }));
  }, [page]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      color="success"
      selectionMode="single"
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
        <TableColumn key="admin">
          {list[language].status.toUpperCase()}
        </TableColumn>
        <TableColumn key="createdAt">
          {list[language].created_account}
        </TableColumn>
        <TableColumn key="name">{list[language].user_name}</TableColumn>
        <TableColumn key="email">{list[language].mail_upper}</TableColumn>
      </TableHeader>
      <TableBody
        items={items}
        loadingContent={<Spinner color="warning" />}
        loadingState={status === "loading" ? "loading" : "idle"}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "admin" ? (
                  <div className="status">
                    <span
                      className="user-info"
                      onClick={() => navigate(`/users/${item.id}`)}
                    >
                      <FaEye />
                    </span>
                    <Chip
                      color={item.admin ? "success" : "danger"}
                      size="sm"
                      variant="flat"
                    >
                      {item.admin ? "admin" : "user"}
                    </Chip>
                  </div>
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AllUsers;
