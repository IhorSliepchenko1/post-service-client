import { useEffect, useState, useMemo } from "react";
import { useMethod } from "../../hooks/useMethod";
import { useDispatch, useSelector } from "react-redux";
import {
  usersCountLimit,
  usersDataAll,
} from "../../features/all-users/allUsersSlice";
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

const AllUsers = () => {
  const { getWithParams } = useMethod();
  const { formatDate } = useConvertDate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const pages = Math.ceil(state.usersAll.usersCount / 10);

  const items = useMemo(() => {
    return state.usersAll.usersDataAll;
  }, [page, state]);

  const getUsers = async () => {
    setLoading(true);
    const response = await getWithParams(`/users`, 10, page);

    const respData = response.data.users.map((user) => ({
      ...user,
      createdAt: formatDate(user.createdAt),
    }));

    dispatch(usersDataAll(respData));
    dispatch(usersCountLimit(response.data.limit));
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  return (
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
        <TableColumn key="admin">STATUS</TableColumn>
        <TableColumn key="createdAt">CREATED AT</TableColumn>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="email">MAIL</TableColumn>
      </TableHeader>
      <TableBody
        items={items}
        loadingContent={<Spinner color="warning" />}
        loadingState={loading ? "loading" : "idle"}
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
                    </Chip>{" "}
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
