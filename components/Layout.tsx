import Head from "next/head"
import React, { ReactNode, FC } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

type LayoutProps = {
	children: ReactNode
}

// meta tags apart from the necessary ones improve SEO. search crawlers get info about the site

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="layout">
			<Head>
				<title>Totem</title>
				<link rel="shortcut icon" href="/static/favicon.ico" />
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					name="description"
					content="Represent Spirituality is a reliable, fast and robust e-commerce platform for all your needs when it comes to browsing and purchasing candles!"
				/>
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
			</Head>
			<header>
				<Navbar />
			</header>
			<main className="main-container">{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	)
}

export default Layout
