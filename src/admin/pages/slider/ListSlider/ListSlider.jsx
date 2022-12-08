import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import classNames from "classnames/bind";
import { Image } from "cloudinary-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import * as sliderService from "~/admin/services/sliderService";
import styles from "./ListSlider.module.scss";

function Slider() {
  const cx = classNames.bind(styles);
  const [data, setData] = useState([]);
  const fetchApi = async () => {
    const response = await sliderService.getSlider();
    setData(response.sliders);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Bạn có muốn xóa ${name} này chứ ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Detele",
      denyButtonText: `Don't Detele`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await sliderService.removeSlider(id);
        fetchApi();

        Swal.fire("Saved!", "", `Bạn đã xóa ${name} thành công`);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const userColumns = [
    {
      field: "_id",
      hide: "true",
    },
    {
      field: "name",
      headerName: "Tên Slider",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx("cellWithImg")} style={{ margin: "0 auto" }}>
            <Image
              className={cx("cellImg")}
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={params.row.image}
            />
            <span className={cx("cellname")}> {params.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "active",
      headerName: "Trạng thái",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx("active")}>
            <div className={cx(`${params.row.active}`)}>
              {params.row.active === true ? "Đang hoạt động" : "Tạm dừng"}
            </div>
          </div>
        );
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
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx("cellAction")} style={{ margin: "0 auto" }}>
            <Link
              to={`EditSlider/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
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
          <div className={cx("datatable")}>
            <div className={cx("datatableTitle")}>
              Danh sách slide
              <Link to="/admin/slider/newslider" className={cx("link")}>
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
                columns={userColumns.concat(actionColumn)}
                priceSize={9}
                rowsPerPageOptions={[9]}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
