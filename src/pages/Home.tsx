import React, {FC, useEffect, useState} from "react";
import {cookies, productApi} from "../api/api";
import {
    Button,
    CircularProgress, Container,
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
import {useNavigate} from 'react-router-dom';

type StateProductsType = {
    items: ProductType[];
    total_count: number;
}

export const Home: FC = () => {
    const token = cookies.get('ox-auth');

    const isAuth = Boolean(token);

    const navigate = useNavigate();

    const [products, setProducts] = useState<StateProductsType>({
        items: [],
        total_count: 0
    });

    const [page, setPage] = useState(1);

    const [pageSize, setPageSize] = useState(50);

    const [loading, setLoading] = useState(false);

    const [searchText, setSearchText] = useState('');
    const matchRegExp = new RegExp(searchText, 'i');

    const items = products.items.filter(({name}) => (
        Boolean(searchText !== ''
            ? (name ?? '').match(matchRegExp)
            : true
        )
    ));

    const totalPages = Math.ceil(products.total_count / pageSize);

    const setFetchedData = async () => {
        setLoading(true);
        const {items, total_count} = await productApi(token).getProducts(page, pageSize);
        setProducts({
            items,
            total_count
        });
        setLoading(false);
    };

    const logOutHandle = () => {
        cookies.remove('ox-auth');
        navigate("/login");
    };

    const paginationHandle = (e: any, page: number) => {
        setPage(page);
    };

    useEffect(() => {
        isAuth && setFetchedData();
    }, [page, pageSize, isAuth]);

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth]);

    return (
        <Container>
            <Button onClick={logOutHandle}>Log out</Button>
            <TextField
                type="text"
                placeholder="Search..."
                onChange={e => setSearchText(e.target.value)}
            />
            {loading
                ? <CircularProgress/>
                : <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product name</TableCell>
                                <TableCell align="center">Brand</TableCell>
                                <TableCell align="center">Size</TableCell>
                                <TableCell align="center">Color</TableCell>
                                <TableCell align="center">UZS</TableCell>
                                <TableCell align="center">USD</TableCell>
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
                                        <TableCell align="center">{supplier}</TableCell>
                                        <TableCell align="center">{size?.value}</TableCell>
                                        <TableCell align="center">{color?.value}</TableCell>
                                        <TableCell align="center">{UZS}</TableCell>
                                        <TableCell align="center">{USD}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>}
            {totalPages > 0 && <Pagination
                count={totalPages}
                onChange={paginationHandle}
            />}
        </Container>
    );
};