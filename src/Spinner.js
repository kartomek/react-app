// styles
import "./Spinner.css";

function Spinner() {
    return (
        <div className="Spinner">
            <div className="backdrop" style={{zIndex: 1}} />
            <div className="lds-ellipsis" style={{zIndex: 2}}><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Spinner;