import Head from "next/head"
import React, { ReactNode, FC } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

type LayoutProps = {
	children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="layout">
			<Head>
				<title>Totem</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
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
