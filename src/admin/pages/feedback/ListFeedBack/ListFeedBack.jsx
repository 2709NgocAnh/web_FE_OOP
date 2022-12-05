import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ListFeedBack.module.scss";
import * as feedbackService from "~/admin/services/feedbackService";

const ListFeedback = () => {
  const cx = classNames.bind(styles);
  const [data, setData] = useState([]);
  const fetchApi = async () => {
    const response = await feedbackService.getFeedBack();
    setData(response.feedbacks);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleDelete = async (id, name) => {
    const result = await confirm(
      `Bạn có chắc chắn muốn xóa FeedBack không?`
    );
    if (!result) {
      return;
    }
    const response = await feedbackService.removeFeedBack(id);
    alert(`Bạn đã xóa FeedBack thành công`);
    setTimeout(() => {
      fetchApi();
    }, 2500);
  };
  const userColumns = [
    {
      field: "_id",
     hide:true
    },
    {
      field: "user",
      headerName: "Khách hàng",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "content",
      headerName: "Nội dung",
      width: 460,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "createdAt",
      headerName: "Ngày gửi",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div style={{ margin: "0 auto" }}>
            {moment(params.row.created_at).format("DD/MM/YYYY HH:mm")}
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Ngày chỉnh sửa",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div style={{ margin: "0 auto" }}>
            {moment(params.row.updated_at).format("DD/MM/YYYY HH:mm")}
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
              to={`/Feedbacks/${params.row._id}`}
             
            >
              <div className={cx("viewButton")}>View</div>
            </Link>
            <div
              className={cx("deleteButton")}
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className={cx("list")}>
      <div className={cx("listContainer")}>
        <div className={cx("datatable")}>
          <div className={cx("datatableTitle")}>Danh sách phản hồi</div>
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
              checkboxSelection
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ListFeedback;
