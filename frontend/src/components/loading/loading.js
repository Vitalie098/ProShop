import React from "react"
import classes from "./loading.module.css"

const Loading = () =>
    <div className={classes.center}>
        <div className={classes.lds}>
            <div /><div />
        </div>
    </div>

export default Loading