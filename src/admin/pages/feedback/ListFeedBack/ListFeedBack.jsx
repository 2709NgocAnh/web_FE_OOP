import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ListFeedBack.module.scss";
import * as feedbackService from "~/admin/services/feedbackService";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import Swal from "sweetalert2";

const ListFeedback = () => {
  const cx = classNames.bind(styles);
  const [data, setData] = useState([]);
  const fetchApi = async () => {
    const response = await feedbackService.getFeedBack();
    setData(response.feedbacks.filter((feedback) => {
        return feedback.user !== null;
      })
    );
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: `<strong>Bạn có chắc chắn muốn xóa feedback ${name} không? 🙌👀</strong>`,
      icon: "info",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Delete',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
    if (result.isConfirmed === true) {
      const fetchApi = async () => {
        const response = await feedbackService.removeFeedBack(id);
        if (response.data.success === true) {
          await Swal.fire(`Bạn đã xóa sản phẩm ${name} thành công🥰`);
          const fetchApi = async () => {
            const response = await feedbackService.getFeedBack();
            setData(response.feedbacks);
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
      field: "user",
      headerName: "Khách hàng",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div style={{ margin: "0 auto" }}>{params.row.user?.fullName}</div>
        );
      },
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
      width: 200,
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
      width: 200,
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
//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       headerClassName: "super-app-theme--header",
//       headerAlign: "center",
//       renderCell: (params) => {
//         return (
//           <div className={cx("cellAction")}>
//             {/* <Link to={`/Feedbacks/${params.row._id}`}>
//               <div className={cx("viewButton")}>View</div>
//             </Link> */}
//             {/* <div
//               className={cx("deleteButton")}
//               onClick={() => handleDelete(params.row._id)}
//             >
//               Delete
//             </div> */}
//           </div>
//         );
//       },
//     },
//   ];
  return (
    <div>
      <Navbar />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>
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
                    columns={userColumns}
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

export default ListFeedback;
