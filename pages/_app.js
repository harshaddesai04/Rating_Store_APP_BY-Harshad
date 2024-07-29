import store from "@/redux-store/store";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Header from "@/components/UI/Header/Header";
import Body from "@/components/UI/Body/Body";
import "@smastrom/react-rating/style.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Header />
      <Body>
        <Component {...pageProps} />
      </Body>
    </Provider>
  );
}
