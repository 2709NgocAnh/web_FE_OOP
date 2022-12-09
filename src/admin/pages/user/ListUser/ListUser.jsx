import { TablePagination } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import * as userService from "~/admin/services/userService";
import styles from "./ListUser.module.scss";

function ListUser() {
  const cx = classNames.bind(styles);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: "0",
    pageSize: "10",
  });
  const [totalTask, setTotalTask] = useState();
  const handleChangePage = (e, newPage) => {
    setPagination({ ...pagination, currentPage: newPage.toString() });
  };
  const handleChangeRowsPerPage = (e) => {
    setPagination({
      pageSize: parseInt(e.target.value, 10).toString(),
      currentPage: "1",
    });
  };
  
  useEffect(() => {
    const fetchApi = async () => {
        const response = await userService.getUser(Number(pagination.currentPage)+1);
        setData(response.users);
        setTotalTask(response.totalItem);
      };
    fetchApi();
  }, [pagination.currentPage]);

  const userColumns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "fullName",
      headerName: "Họ và tên",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx("cellWithImg")} style={{ margin: "0 auto" }}>
            {params.row.fullName}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return <div style={{ margin: "0 auto" }}>{params.row.email}</div>;
      },
    },

    {
      field: "role",
      headerName: "Loại",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return <div style={{ margin: "0 auto" }}>{params.row.role}</div>;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div style={{ margin: "0 auto" }}>
            {moment(params.row.createdAt).format("DD/MM/YYYY HH:mm")}
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Ngày Chỉnh sửa",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div style={{ margin: "0 auto" }}>
            {moment(params.row.updatedAt).format("DD/MM/YYYY HH:mm")}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx("cellAction")} style={{ margin: "0 auto" }}>
            <Link
              to={`/admin/user/edituser/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={cx("viewButton")}>Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
    <Navbar />
    <div className={cx("container")}>
      <Sidebar />
      <div className={cx("content")}>
    <div className={cx("datatable")}>
      <div className={cx("datatableTitle")}>
        Danh sách người dùng
        <Link to="/admin/user/newuser" className={cx("link")}>
          Thêm mới
        </Link>
      </div>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          "& .super-app-theme--header": {
            backgroundColor: "#89CFFD",
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          className={cx("datagrid")}
          rows={data}
          columns={userColumns}
          checkboxSelection
          page={Number(pagination.currentPage)}
          count={totalTask}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20,{ value: totalTask || 5, label: "Tất cả" },]}
          pagination
          hideFooterPagination='true'

        />
        <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { value: totalTask || 5, label: "Tất cả" },
              ]}
              labelRowsPerPage="Số dòng hiển thị"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} trên tổng số ${count}`
              }
              component="div"
              count={totalTask}
              rowsPerPage={Number(pagination.pageSize) ?? 10}
              page={Number(pagination.currentPage)}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </Box>
    </div>
    </div>
    </div>
    </div>
  );
}

export default ListUser;
