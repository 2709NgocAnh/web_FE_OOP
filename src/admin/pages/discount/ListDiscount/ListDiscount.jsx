import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import * as discountService from "~/admin/services/discountService";
import styles from "./ListDiscount.module.scss";

const ListDiscount = () => {
  const cx = classNames.bind(styles);
  const [data, setData] = useState([]);

  const fetchApi = async () => {
    const response = await discountService.getDiscount();
    setData(response.discounts);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleDelete = async (id, code) => {
    const result = await confirm(
      `Bạn có chắc chắn muốn xóa Danh mục ${code} không?`
    );
    if (!result) {
      return;
    }
    const response = await discountService.removeDiscount(id);
    alert(`Bạn đã xóa Danh mục ${code} thành công`);

    setTimeout(() => {
      fetchApi();
    }, 2500);
  };

  const userColumns = [
    {
      field: "_id",
      hide: true,
    },

    {
      field: "code",
      headerName: "Mã code",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
        field: "purchase_current",
        headerName: "Mua hiện tại",
        width: 270,
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
      },
      {
        field: "content",
        headerName: "Content",
        width: 270,
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
      },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 220,
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
      field: " updatedAt",
      headerName: "Ngày chỉnh sửa",
      width: 220,
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
      field: "active",
      headerName: "Status",
      width: 220,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx(`active`)}>
            <div className={cx(`${params.row.active}`)}>
              {params.row.active === true ? "Đang hoạt động" : "Tạm dừng"}
            </div>
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
            <Link to={`/admin/discount/editdiscount/${params.row._id}`}>
              <div className={cx("viewButton")}>Edit</div>
            </Link>
            <div
              className={cx("deleteButton")}
              onClick={() => handleDelete(params.row._id, params.row.code)}
            >
              Delete
            </div>
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
          <div className={cx("datatableTitle")}>
            Danh sách Discount
            <Link to="/admin/discount/newdiscount" className={cx("link")}>
              Thêm mới
            </Link>
          </div>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "#7451f8",
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
                },"& .super-app-theme--header": {
                  backgroundColor: "#89CFFD",
                },
               
              }}
              getRowId={(row) => row._id}
              className={cx("datagrid")}
              rows={data}
              columns={userColumns.concat(actionColumn)}
              priceSize={9}
              rowsPerPageOptions={[9]}
            />
          </Box>
        </div>
      </div>
    </div>
    </div>    </div>    </div>
  );
};

export default ListDiscount;
