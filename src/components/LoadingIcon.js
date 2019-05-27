import React from "react"

const LoadingIcon = (props) => {

    if(props.type === "ellipsis"){
        return(
            <object width="100" height="100" type="image/svg+xml" data="img/loading-ellipsis.svg"> </object>
        )
    }
    else{
        return(
            <object width="100" height="100" type="image/svg+xml" data="img/loading-circle.svg"> </object>
        )
    }
    
} 

export default LoadingIcon