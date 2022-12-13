import styles from "./ViewOrder.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import SideBar from "./component/sidebar/SideBar";
import NoOrder from "./component/noorder/NoOrder";
import * as orderService from "~/admin/services/orderService";
import Header from "~/customer/Layout/components/header/Header";

const ViewOrder = () => {
  TabTitle("Đơn hàng của tôi");
  const cx = classNames.bind(styles);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState();

  const fetchApi = async () => {
    const response = await orderService.getListOrder();
    setData(response.orders);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const listorderstatus = [
    { id: 0, name: "pending", title: "Chờ xác nhận", disabled: true },
    { id: 1, name: "cancelled", title: "Đã Hủy", disabled: true },
    {
      id: 2,
      name: "processing",
      title: " Chờ shipper nhận hàng",
      disabled: true,
    },
    { id: 3, name: "shipping", title: "Đang giao", disabled: true },
    { id: 4, name: "shipped", title: "Đã giao", disabled: true },
    { id: 5, name: "received", title: "Đã nhận", disabled: true },
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
                return (
                  <div className={cx("status")}>
                    <div className={cx(result?.name)}>{result?.title}</div>
                  </div>
                );
              }
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
            {moment(params.row.updatedAt).format("DD/MM/YYYY HH:mm")}
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
              to={`/order/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={cx("viewButton")}>View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  if (data?.length === 0) {
    return (
        <>
      <Header  />

      <div className={cx("wrap")}>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <SideBar />
        </div>
        <div className="col-md-9 col-sm-12 col-xs-12">
          <div className={cx("single")}>
            <div className={cx("singleContainer")}>
              <div className={cx("list")}>
                <div className={cx("listContainer")}>
                  <div className={cx("row")}>
                    <NoOrder />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  } else {
    return (
      <>
        <Header search={search} onChange={(e) => setSearch(e.target.value)} />
        <div className={cx("wrap")}>
          <SideBar />
          <div className="col-md-9 col-sm-12 col-xs-12">
            <div className={cx("single")}>
              <div className={cx("singleContainer")}>
                <div className={cx("list")}>
                  <div className={cx("listContainer")}>
                    <div className={cx("datatable")}>
                      <p>{data.length} đơn hàng</p>
                      <Box
                        sx={{
                          height: "300px",
                          width: "95%",
                        }}
                      >
                        <DataGrid
                          sx={{
                            boxShadow: 2,
                            border: 1,
                            borderColor: "lightgray",
                            "& .MuiDataGrid-cell:hover": {
                              color: "primary.main",
                            },
                          }}
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
        </div>
      </>
    );
  }
};
export default ViewOrder;
