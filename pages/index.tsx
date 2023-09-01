import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then(res => res.json())
      .then(data => {
        if (data.products.length) {
          setProducts(data.products);
        }
      })
      .catch(err => console.log(err));
  }, [])


  return (
    <main className={styles.main}>
      <div>
        <button onClick={() => router.push('/product')}>Add Products</button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((item: { id: string, title: string, price: number }) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  )
}
