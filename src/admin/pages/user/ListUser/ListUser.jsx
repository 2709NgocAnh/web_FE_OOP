import styles from './ListUser.module.scss';
import classNames from 'classnames/bind';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import * as userService from "~/admin/services/userService";


function ListUser() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);

    
    const fetchApi = async () => {
        const response = await userService.getUser();
        setData(response.users);
      };
      useEffect(() => {
        fetchApi();
      }, []);
    
    const userColumns = [
        {
            field: 'id',
            hide:true
        },
        {
            field: 'fullName',
            headerName: 'Họ và tên',
            width: 230,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',

            renderCell: (params) => {
                return (
                    <div className={cx('cellWithImg')} style={{ margin: '0 auto' }}>
                        {/* <img className={cx('cellImg')} src={params.row.img} alt="avatar" /> */}
                        {params.row.fullName}
                    </div>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 230,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',

            renderCell: (params) => {
                return <div style={{ margin: '0 auto' }}>{params.row.email}</div>;
            },
        },

        {
            field: 'role',
            headerName: 'Loại',
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',

            renderCell: (params) => {
                return <div style={{ margin: '0 auto' }}>{params.row.role}</div>;
            },
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            width: 230,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',

            renderCell: (params) => {
                return (
                    <div style={{ margin: '0 auto' }}>{moment(params.row.createdAt).format('DD/MM/YYYY HH:mm')}</div>
                );
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Ngày Chỉnh sửa',
            width: 230,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',

            renderCell: (params) => {
                return (
                    <div style={{ margin: '0 auto' }}>{moment(params.row.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',

            renderCell: (params) => {
                return (
                    <div className={cx('cellAction')} style={{ margin: '0 auto' }}>
                        <Link to={`/admin/user/edituser/${params.row._id}`} style={{ textDecoration: 'none' }}>
                            <div className={cx('viewButton')}>Edit</div>
                        </Link>
                        
                    </div>
                );
            },
        },
    ];

    return (
        <div className={cx('datatable')}>
            <div className={cx('datatableTitle')}>
                Danh sách người dùng
                <Link to="/admin/user/newuser" className={cx('link')}>
                    Thêm mới
                </Link>
            </div>
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    '& .super-app-theme--header': {
                        backgroundColor: '#89CFFD',
                    },
                }}
            >
                <DataGrid getRowId={(row) => row._id} className={cx('datagrid')} rows={data} columns={userColumns} checkboxSelection />
            </Box>
        </div>
    );
}

export default ListUser;