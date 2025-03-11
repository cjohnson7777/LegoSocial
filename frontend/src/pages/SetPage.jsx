import { useLocation } from "react-router-dom";

function SetPage(props){
    const { state } = useLocation();
    console.log(state.setNum);

    return (
        <div>
            set page
            {state.setNum}

        </div>
    )
}


export default SetPage