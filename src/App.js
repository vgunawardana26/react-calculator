import './App.css';
import Button from './components/Button';
import OperationButton from './components/OperationButton';
import './style.css'
import { useEffect, useReducer } from 'react';

export const ACTIONS = {
  ADD_DIGIT: 'ADD_DIGIT',
  DEL_DIGIT: 'DEL',
  CLEAR: 'AC',
  CHOOSE_OPERATION: 'CHOOSE_OPERATION',
  EVALUATE: '='
}

function reducer(state, action) {

  switch (action.type) {
    case ACTIONS.DEL_DIGIT:
      return {
        ...state,
        curr: state.curr.substring(0, state.curr.length - 1)
      }
    case ACTIONS.EVALUATE:
      if (!state.prev && !state.curr) return state
      if (!state.curr) return state
      if (state.curr !== null && state.operation !== null) {
        return {
          prev: null,
          curr: compute(state, action),
          operation: null
        }
      }
    case ACTIONS.CLEAR:
      return { prev: null, curr: null, operation: null }

    case ACTIONS.ADD_DIGIT:
      if (state?.curr?.split('')[0] !== '0' || state?.curr?.split('')[0] !== null && action.payload === '0') return state
      if (state.curr?.includes('.') && action.payload === '.') return state

      return {
        ...state,
        curr: state.curr ? state.curr + action.payload : action.payload
      }

    case ACTIONS.CHOOSE_OPERATION:

      if (!state.prev && !state.curr) return state
      if (!state.curr) return state
      if (state.curr !== null && state.operation === null) {
        return {
          ...state,
          prev: state.curr,
          curr: null,
          operation: action.payload
        }
      }
      return {
        prev: compute(state, action),
        curr: null,
        operation: action.payload
      }
  }

}

function compute({ prev, curr, operation }) {
  const previous = parseFloat(prev)
  const current = parseFloat(curr)
  switch (operation) {
    case "+":
      return (previous + current).toString()
    case "-":
      return (previous - current).toString()
    case "÷":
      return (previous / current).toString()
    case "×":
      return (previous * current).toString()

  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, { prev: null, curr: null, operation: null })



  return <>
    <div className='calculator-grid'>
      <div className="output">
        <div className='prev-operand'>
          {state.prev ? state.prev : null}
          <span style={{ paddingLeft: ".25rem" }}>{state.operation}</span>
        </div>
        <div className='curr-operand'> {state.curr}</div>

      </div>
      <OperationButton className='span-2' operation={ACTIONS.CLEAR} dispatch={dispatch}></OperationButton>
      <OperationButton operation={ACTIONS.DEL_DIGIT} dispatch={dispatch}></OperationButton>
      <OperationButton operation={"÷"} dispatch={dispatch}></OperationButton>

      <Button digit={"7"} dispatch={dispatch} />
      <Button digit={"8"} dispatch={dispatch} />
      <Button digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"×"} dispatch={dispatch}></OperationButton>

      <Button digit={"4"} dispatch={dispatch} />
      <Button digit={"5"} dispatch={dispatch} />
      <Button digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch}></OperationButton>

      <Button digit={"1"} dispatch={dispatch} />
      <Button digit={"2"} dispatch={dispatch} />
      <Button digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch}></OperationButton>
      <Button digit={"0"} dispatch={dispatch} />
      <Button digit={"."} dispatch={dispatch}></Button>
      <OperationButton className='span-2' operation={"="} dispatch={dispatch}></OperationButton>



    </div>

  </>

}

export default App;
