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
import styles from "./PendingOrderList.module.scss";

const PendingOrderList = () => {
  const cx = classNames.bind(styles);
  const [data, setData] = useState([]);
  
 
  useEffect(() => {
    const fetchApi = async () => {
      const response = await orderService.listPendingOrder();
      setData(response.orders);
    };
    fetchApi();
  }, []);
  

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
        return params.row.user?.fullName;
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
       
          return (
            <div>
            {params.row.status}
          </div>
        );
      },
      
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
              to={`/admin/pendingOrder/${params.row._id}`}
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
                <div className={cx("datatableTitle")}>Danh sách đơn hàng chờ xử lý</div>
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
                  
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PendingOrderList;
