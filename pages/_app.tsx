import "../styles/globals.scss"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { StateContext } from "../context/StateContext"

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<StateContext>
			<Layout>
				<Component {...pageProps} />
				<ToastContainer
					position="top-center"
					autoClose={3500}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</Layout>
		</StateContext>
	)
}

export default MyApp
