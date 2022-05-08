import "../styles/globals.scss"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { ToastContainer } from "react-toastify"

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<ToastContainer />
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
