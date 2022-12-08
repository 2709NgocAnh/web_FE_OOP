import { TablePagination } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import * as orderService from "~/admin/services/orderService";
import styles from "./ListOrder.module.scss";

const ListOrder = () => {
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
      const response = await orderService.getOrder(
        Number(pagination.currentPage) + 1
      );
      setData(response.orders);
      setTotalTask(response.totalItem);
    };
    fetchApi();
  }, [pagination.currentPage]);
  const listorderstatus = [
    { id: 0, name: "pending", title: "Chờ xác nhận", disabled: true },
    { id: 1, name: "cancelled", title: "Hủy", disabled: true },
    { id: 3, name: "processing", title: "Xác nhận đơn hàng", disabled: true },
    { id: 4, name: "shipping", title: "Đang giao", disabled: true },
    { id: 5, name: "shipped", title: "Đã giao", disabled: true },
    { id: 6, name: "received", title: "Đã nhận", disabled: true },
  ];

  const userColumns = [
    {
      field: "id",
      headerName: "Mã đơn hàng",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "user",
      headerName: "Tên khách hàng",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.user.fullName;
      },
    },
    {
      field: "discount",
      headerName: "Mã giảm giá",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "transportFee",
      headerName: "Price Ship",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "totalPrice",
      headerName: "Price",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "note",
      headerName: "Note",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Trạng thái đơn hàng",
      width: 220,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        const result = listorderstatus.find(
          (status, index) => status.name === params.row.status
        );
        return <div className={cx("status")}>{result?.title}</div>;
      },
      //   renderCell: (params) => {
      //     return (
      //       <div className={cx("status")}>
      //         <div
      //           className={cx(
      //             params.row.status === 0
      //               ? "active"
      //               : params.row.status === 1
      //               ? "pending"
      //               : "passive"
      //           )}
      //         >
      //           {params.row.status === 0
      //             ? "Chờ xác nhận"
      //             : params.row.status === 1
      //             ? "Đang giao "
      //             : "Đã giao"}
      //         </div>
      //       </div>
      //     );
      //   },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 170,
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
      field: "updategAt",
      headerName: "Ngày chỉnh sửa",
      width: 170,
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
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx("cellAction")}>
            <Link
              to={`/admin/order/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={cx("viewButton")}>View</div>
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
          <div className={cx("list")}>
            <div className={cx("listContainer")}>
              <div className={cx("datatable")}>
                <div className={cx("datatableTitle")}>Danh sách hóa đơn</div>
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
                    sx={{
                      boxShadow: 2,
                      border: 2,
                      borderColor: "primary.light",
                      "& .MuiDataGrid-cell:hover": {
                        color: "primary.main",
                      },
                    }}
                    className={cx("datagrid")}
                    rows={data}
                    columns={userColumns.concat(actionColumn)}
                    hideFooterPagination="true"
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
      </div>
    </div>
  );
};
export default ListOrder;
