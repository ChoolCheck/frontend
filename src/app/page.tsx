"use client";

import styles from "./page.module.css";
import axios from "axios";
import { useEffect } from "react";

export default function main() {
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/hello",
    })
      .then((res) => {
        console.log("성공");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("실패");
      });
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.description}>hello</div>
    </main>
  );
}
