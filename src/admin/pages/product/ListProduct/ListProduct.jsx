import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as productService from "~/admin/services/productService";
import * as categoryService from "~/admin/services/categoryService";
import styles from "./ListProduct.module.scss";
import { confirm } from "react-confirm-box";
import { Image } from "cloudinary-react";

const ListProduct = () => {
  const [list, setList] = useState([]);
  const [category_id, setCategory_id] = useState([]);

  const cx = classNames.bind(styles);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await productService.getProduct();
      setList(response.products);
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await categoryService.getCategory();
      setCategory_id(response.categories);
    };
    fetchApi();
  }, []);
  const handleDelete = async (id, name) => {
    const result = await confirm(
      `Bạn có chắc chắn muốn xóa Danhh mục ${name} không?`
    );
    if (!result) {
      return;
    }
    const response = await productService.removeProduct(id, name);
    alert(`Bạn đã xóa sản phẩm ${name} thành công  `);
    setTimeout(() => {
      const fetchApi = async () => {
        const response = await productService.getProduct();
        setList(response.products);
      };
    }, 2000);
  };

  const userColumns = [
    {
      field: "_id",
      hide:true
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      type: "text",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={cx("cellWithImg")} style={{ margin: "0 auto" }}>
            <Image
              className={cx("cellImg")}
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={params.row.images[0]}
            />
            <span className={cx("cellname")}> {params.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "category_id",
      headerName: "Phân loại",
      type: "text",
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div >
            {category_id.map((category) => (
                  (category._id === params.row.category_id)?category.name : ""
                  ))}
            </div>
        );
      },
    },
    {
      field: "active",
      headerName: "Trạng thái",
      width: 160,
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
    {
      field: "price",
      headerName: "Giá gốc",
      type: "text",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.row.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        );
      },
    },
    {
      field: "price_sale",
      type: "text",
      headerName: "Giá Sale",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.row.price_sale?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        );
      },
    },
    {
      field: "num",
      headerName: "Số lượng trong kho",
      type: "text",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "num_buy",
      headerName: "Số lượng đã bán",
      type: "text",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "createdAt",
      headerName: "Ngày tạo",
      type: "date",
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
      field: "updatedAt",
      headerName: "Ngày chỉnh sửa",
      type: "date",
      width: 170,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      textAlight: "center",
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
            <NavLink
              to={`${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={cx("viewButton")}>View</div>
            </NavLink>
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
    <div className={cx("list")}>
      <div className={cx("listContainer")}>
        <div className={cx("datatable")}>
          <div className={cx("datatableTitle")}>
            Danh sách sản phẩm
            <NavLink to="newproduct" className={cx("link")}>
              Thêm mới
            </NavLink>
          </div>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              "& .super-app-theme--header": {
                fontFamily: "Nunito",
                fontSize: "16px",
                backgroundColor: "#89CFFD",
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              className={cx("datagrid")}
              rows={list}
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

export default ListProduct;
