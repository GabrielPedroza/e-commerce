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

export default firesaleconfetti
