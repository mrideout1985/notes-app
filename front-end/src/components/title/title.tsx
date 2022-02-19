import styles from "./title.module.scss";

type TitleProps = {
  title: string;
  color?: string;
};

const Title = ({ title, color }: TitleProps) => {
  return (
    <div className={styles["title"]} style={{ color: `${color}` }}>
      <h1>{title}</h1>
    </div>
  );
};

export { Title };
