// Import libraries
import { MoonLoader } from "react-spinners";

// Loading component
const Loading = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
            <MoonLoader color={"var(--text-color)"} size={75} />
        </div>
    )
}

export default Loading;