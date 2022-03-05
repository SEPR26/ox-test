import React, {FC, useEffect, useState} from "react";
import {authApi, cookieOpts, cookies, productApi} from "../api/api";
import {
    Button,
    Pagination,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {ProductType} from '../types';

type StateProductsType = {
    items: ProductType[];
    total_count: number;
}

export const Auth: FC = () => {
    const [loginData, setLoginData] = useState({username: '', password: ''});

    const [products, setProducts] = useState<StateProductsType>({
        items: [],
        total_count: 0
    });

    const {items, total_count} = products;

    const [page, setPage] = useState(1);

    const [pageSize, setPageSize] = useState(100);

    const totalPages = Math.ceil(products.total_count / pageSize);

    const login = async () => {
        const {username, password} = loginData;
        const res = await authApi.login(username, password);
        cookies.set('ox-auth', res.token, cookieOpts);
        console.log(res);
    };

    const handleLogin = ({target: {name, value}}: any) => {
        setLoginData({
            ...loginData,
            [name]: value
        });
    };
    // console.log(loginData)

    const setFetchedData = async () => {
        const {items, total_count} = await productApi.getProducts(page, pageSize);
        setProducts({
            items,
            total_count
        });
    };

    const paginationHandle = (e: any, page: number) => {
        setPage(page);
    };

    useEffect(() => {
        setFetchedData();
    }, [page, pageSize]);


    console.log(products);
    console.log(totalPages);

    return (
        <div>
            <TextField
                placeholder="login"
                name="username"
                value={loginData.username}
                onChange={handleLogin}
            />
            <TextField
                placeholder="password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLogin}
            />
            <Button onClick={login}>click</Button>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product name</TableCell>
                            <TableCell align="right">Brand</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Color</TableCell>
                            <TableCell align="right">UZS</TableCell>
                            <TableCell align="right">USD</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => {

                            const {name, supplier, properties, importRecord, id} = item;
                            const [size, color] = properties;
                            const {UZS, USD} = importRecord?.stockSellPrice ?? {};

                            return (
                                <TableRow
                                    key={id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">{name}</TableCell>
                                    <TableCell align="right">{supplier}</TableCell>
                                    <TableCell align="right">{size?.value}</TableCell>
                                    <TableCell align="right">{color?.value}</TableCell>
                                    <TableCell align="right">{UZS}</TableCell>
                                    <TableCell align="right">{USD}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalPages > 0 && <Pagination
                count={totalPages}
                onChange={paginationHandle}
            />}

        </div>
    );
};