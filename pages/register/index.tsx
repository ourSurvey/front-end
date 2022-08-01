import type { NextPage } from "next";
import css from "styled-jsx/css";
import Register from "components/Register";
import styles from "styles/Home.module.scss";
const Index: NextPage = () => {
  const style = css`
    .container {
      width: 100vw;
      height: 100vh;
      padding: 21.5px 20px 35px 20px;
    }
  `;
  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
};

export default Index;
