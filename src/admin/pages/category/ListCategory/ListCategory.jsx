import { Window } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import * as categoryService from "~/admin/services/categoryService";
import styles from "./ListCategory.module.scss";

const ListCategory = () => {
  const cx = classNames.bind(styles);
  const [data, setData] = useState([]);

 
  useEffect(() => {
    const fetchApi = async () => {
        const response = await categoryService.getCategory();
        setData(response.categories);
      };
    fetchApi();
  }, []);

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
        title: `<strong>Bạn có chắc chắn muốn xóa Danh mục ${name} không? 🙌👀</strong>`,
        icon: "info",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: "Thumbs down",
      });
      if (result.isConfirmed === true) {
        const fetchApi = async () => {
          const res = await categoryService.removeCategory(id);
          if (res.data.success === true) {
            await Swal.fire(`Bạn đã xóa Danh mục ${name} thành công🥰`);
            const fetchApi = async () => {
                const response = await categoryService.getCategory();
                setData(response.categories);
              };
            fetchApi();
          }
        };
        fetchApi();
      }
  };

  const userColumns = [
    {
      field: "_id",
      hide: true,
    },

    {
      field: "name",
      headerName: "Name",
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
            <Link to={`/admin/category/editcategory/${params.row._id}`}>
              <div className={cx("viewButton")}>Edit</div>
            </Link>
            <div
              className={cx("deleteButton")}
              onClick={() => handleDelete(params.row._id, params.row.name)}
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
            Danh mục
            <Link to="/admin/category/newcategory" className={cx("link")}>
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
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
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
    </div>
      </div>
    </div>
  );
};

export default ListCategory;
