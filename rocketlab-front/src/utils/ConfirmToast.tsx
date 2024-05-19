import { ToastContainer } from "react-toastify"

const ConfirmToast = () => {
    return (
        <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    )
}

export default ConfirmToast;

