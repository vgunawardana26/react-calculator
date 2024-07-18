import React, { useEffect } from 'react'
import { ACTIONS } from '../App'

function OperationButton({ operation, dispatch, ...props }) {


    function returnType(op) {

        switch (op) {
            case "+":
            case "-":
            case "×":
            case "÷":

                return ACTIONS.CHOOSE_OPERATION
            default:
                return operation
        }
    }

    return (
        <button className={props.className ? props.className : null} onClick={() => dispatch({ type: returnType(operation), payload: operation })}>{operation}</button>
    )
}

export default OperationButton