import { ReactPropTypes } from 'react'
import { ReactElement } from 'react'
import { useEffect, useReducer } from 'react'

function fetchReducer<T>(
  state: FetchState<T, any>,
  action: FetchReducerAction<T>,
) {
  switch (action.type) {
    case 'ERROR': {
      return {
        ...state,
        status: 'REJECTED' as PromiseStatus,
        error: action.error,
      }
    }
    case 'STARTED': {
      return {
        ...state,
        extended: action.extended,
        status: 'PENDING' as PromiseStatus,
      }
    }
    case 'SUCCESS': {
      return {
        ...state,
        status: 'RESOLVED' as PromiseStatus,
        response: action.response,
      }
    }
    default: {
      throw new Error(`Unhandled useFetch action type: ${action.type}`)
    }
  }
}

type Fetcher = () => Promise<any>
export default function useFetch<ExtendedState>(
  fetcher: Fetcher,
  extendedState: () => ExtendedState,
): [FetchState<ExtendedState, any>, typeof buildFetchComponent] {
  const [state, dispatch] = useReducer(fetchReducer, {
    extended: null,
    status: 'IDLE',
    response: null,
    error: null,
  })

  const start = () => {
    dispatch({
      type: 'STARTED',
      extended: extendedState(),
      response: null,
      error: null,
    })
  }
  const success = response => {
    dispatch({
      type: 'SUCCESS',
      response,
    })
  }
  const error = (e: any) => {
    dispatch({
      type: 'ERROR',
      error: e,
    })
  }

  useEffect(() => {
    start()
    fetcher().then(success, error)
  }, [])

  return [state as FetchState<ExtendedState, any>, buildFetchComponent]
}

export function buildFetchComponent<T, R>(
  status: PromiseStatus,
  state: FetchState<T, R>,
) {
  return ({
    Failure,
    Loading,
    Success,
  }: {
    Failure: CellBuilder<T, R>
    Loading: CellBuilder<T, R>
    Success: CellBuilder<T, R>
  }): ReactElement => {
    if (status === 'IDLE') {
      return null
    }
    if (status === 'PENDING') {
      return Loading(state)
    }
    if (status === 'RESOLVED') {
      return Success(state)
    } else if (status === 'REJECTED') {
      console.error(state.error)
      return Failure(state)
    }
  }
}

/**
 * MARK - Type Declarations
 */

type CellBuilder<T, R> = (state: FetchState<T, R>) => ReactElement

type FetchReducerAction<T> = {
  extended?: T
  type: 'ERROR' | 'STARTED' | 'SUCCESS'
  response?: any
  error?: any
}

export type PromiseStatus = 'IDLE' | 'PENDING' | 'REJECTED' | 'RESOLVED'

export type FetchState<T, R> = {
  extended: T
  status: PromiseStatus
  response: R
  error: any
}
