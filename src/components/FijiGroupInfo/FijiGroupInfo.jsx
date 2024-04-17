import styles from './fiji-group-info.module.scss';

const HomePage = () => {
  return (
    <>
      <div className={`${styles.box} ${styles.firstBox}`}></div>
      <div className={styles.box}>
        <strong>Fiji Group Restaurants</strong> - це мережа ресторанів, яка не слідує шаблонам, а
        володіючи проактивною позицією, з любов'ю дарує якісний відпочинок тут і
        зараз кожному Гостю, через можливість вибору чого хоче саме Він.

        Головними ідеологами та творцями мережі, яка була заснована у квітні
        2015 року, стали ресторатори з 15-річним досвідом роботи у сфері
        гостинності – <strong>Олена Журба</strong> та <strong>Альона Басецька</strong>.
      </div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
    </>
  );
};

export default HomePage;
