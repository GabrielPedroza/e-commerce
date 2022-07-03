import confetti from "canvas-confetti"

const firesaleconfetti = () => {
	var end = Date.now() + 1.5 * 1000 // 1.5 seconds

	// go Buckeyes!
	var colors = ["#FFA500", "#FF0000"]
	;(function frame() {
		confetti({
			particleCount: 2,
			angle: 60,
			spread: 55,
			origin: { x: 0 },
			colors: colors,
		})
		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			origin: { x: 1 },
			colors: colors,
		})

		if (Date.now() < end) {
			requestAnimationFrame(frame)
		}
	})()
}

const duration = 15 * 1000
const animationEnd = Date.now() + duration
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

const randomInRange = (min: number, max: number) => {
	return Math.random() * (max - min) + min
}

export const interval: ReturnType<typeof setInterval> = setInterval(() => {
	const timeLeft = animationEnd - Date.now()
	if (timeLeft <= 0) {
		return clearInterval(interval)
	}

	const particleCount = 50 * (timeLeft / duration)
	// since particles fall down, start a bit higher than random
	confetti(
		Object.assign({}, defaults, {
			particleCount,
			origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
		})
	)
	confetti(
		Object.assign({}, defaults, {
			particleCount,
			origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
		})
	)
}, 250)

export default firesaleconfetti
