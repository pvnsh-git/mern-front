import styles from './styles.module.css'
import { useState } from 'react';
import {useRouter} from 'next/router';

const Product = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  const handleSend = () => {
    const body = {
      title,
      price: Number(price)
    }
    fetch("http://localhost:8000/product", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err));

      router.push('/')
  }
  return (
    <div className={styles.description}>
      <div className={styles.link}>
        <a href="/" >Back to Home</a>
      </div>
      <div className={styles.display}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />
      <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Product;