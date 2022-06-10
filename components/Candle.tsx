import styles from "../styles/Candle.module.scss"

const Candle = () => {
	return (
		<div className={styles.wrapper} role="complementary">
			<div className={styles.center}>
				<div className={styles.candle}>
					<div className={styles.candleFlame}></div>
					<div className={styles.candleWick}></div>
					<div className={styles.candleWax}></div>
					<div className={styles.candleStand}></div>
				</div>
			</div>
		</div>
	)
}

export default Candle
