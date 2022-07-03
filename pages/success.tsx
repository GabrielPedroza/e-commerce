import React from "react"

const success = () => {
	return (
		<div className="s-card">
			<div className="s-container">
				<i className="checkmark">✓</i>
			</div>
			<h1 className="s-title">Success</h1>
			<p className="s-p">
				We received your purchase request;
				<br />
				we&apos;ll be in touch shortly!
			</p>
		</div>
	)
}

// style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;"

export default success
