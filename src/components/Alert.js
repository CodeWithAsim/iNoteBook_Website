import React from 'react'

const Alert = (props) => {


    // return (
    //     <div>
    //         <div className="alert alert-primary" role="alert">
    //             {props.message}
    //         </div>
    //     </div>
    // )


    const capitalize = (word) => {

        if (word === "danger") {
            word = "error";
        }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);

    }

    return (
        // yahan pr height is alert component ki hai wo show ho ya na ho ... agr ni ho tw us ki jagah khali utni space show ho ...
        <div style={{ height: "55px" }} >

            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                <strong>{capitalize(props.alert.type)} : </strong>{props.alert.message}
            </div>}

        </div>
    )
}

export default Alert
