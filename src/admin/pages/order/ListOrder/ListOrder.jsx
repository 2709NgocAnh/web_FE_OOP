import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as orderService from '~/admin/services/orderService';
import styles from './ListOrder.module.scss';

const ListOrder = () => {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);

    const fetchApi = async () => {
        const response = await orderService.getOrder();
        setData(response.orders)
      };
    useEffect(() => {
          fetchApi();
    }, []);

    const userColumns = [
        {
            field: '_id',
            hide: true
        },
        {
            field: 'user["_id"]',
            headerName: 'Tên khách hàng',
            width: 230,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'discount',
            headerName: 'Mã giảm giá',
            width: 170,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'transportFee',
            headerName: 'Price Ship',
            width: 170,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'totalPrice',
            headerName: 'Price',
            width: 170,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'note',
            headerName: 'Note',
            width: 170,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: "status",
            headerName: "Trạng thái đơn hàng",
            width: 220,
            headerClassName: "super-app-theme--header",
            headerAlign: "center",
            renderCell: (params) => {
              return (
                <div className={cx('status')}>
                  <div className={cx(params.row.status===0? "active" :(params.row.status===1? "pending":"passive"))}>
                    {params.row.status === 0 ? "Chờ xác nhận" :(params.row.status === 1 ? "Đang giao ":"Đã giao")}
                  </div>
                </div>
              );
            },
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            width: 170,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <div style={{ margin: '0 auto' }}>{moment(params.row.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
                );
            },
        },
        {
            field: 'updategAt',
            headerName: 'Ngày chỉnh sửa',
            width: 170,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <div style={{ margin: '0 auto' }}>{moment(params.row.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
                );
            },
        },
    ];
    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <div className={cx('cellAction')}>
                        <Link to={`/admin/order/${params.row._id}`} style={{ textDecoration: 'none' }}>
                            <div className={cx('viewButton')}>View</div>
                        </Link>
                        
                    </div>
                );
            },
        },
    ];
    return (
        <div className={cx('list')}>
            <div className={cx('listContainer')}>
                <div className={cx('datatable')}>
                    <div className={cx('datatableTitle')}>
                        Danh sách hóa đơn
                        
                    </div>
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            '& .super-app-theme--header': {
                                backgroundColor: "#89CFFD",
                            },
                        }}
                    >
                        <DataGrid
                            sx={{
                                boxShadow: 2,
                                border: 2,
                                borderColor: 'primary.light',
                                '& .MuiDataGrid-cell:hover': {
                                    color: 'primary.main',
                                },
                            }}
                            className={cx('datagrid')}
                            rows={data}
                            columns={userColumns.concat(actionColumn)}
                            priceSize={9}
                            checkboxSelection
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default ListOrder;