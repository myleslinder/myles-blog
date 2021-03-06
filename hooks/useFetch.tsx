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

type Fetcher<T> = () => Promise<T>
export default function useFetch<ExtendedState, R>(
  fetcher: Fetcher<R>,
  extendedState?: () => ExtendedState,
): [FetchState<ExtendedState, R>, typeof buildCellComponent, () => void] {
  const [state, dispatch] = useReducer(fetchReducer, {
    extended: null,
    status: 'IDLE',
    response: null,
    error: null,
  })

  const refresh = () => {
    start()
    fetcher().then(success, error)
  }

  const start = () => {
    dispatch({
      type: 'STARTED',
      extended: extendedState !== undefined ? extendedState() : null,
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
    refresh()
  }, [])

  return [state as FetchState<ExtendedState, R>, buildCellComponent, refresh]
}

export function buildCellComponent<T, R>(
  state: FetchState<T, R>,
  refresh: () => void,
) {
  const cellComponentBuilder: CellComponentBuilder<T, R> = ({
    Failure,
    Loading,
    Success,
  }) => {
    if (state.status === 'IDLE') {
      return null
    }
    if (state.status === 'PENDING') {
      return Loading(state, refresh)
    }
    if (state.status === 'RESOLVED') {
      return Success(state, refresh)
    } else if (state.status === 'REJECTED') {
      console.error(state.error)
      return Failure(state, refresh)
    }
  }
  return cellComponentBuilder
}

/**
 * MARK - Type Declarations
 */

export type CellComponentBuilder<T, R> = ({
  Failure,
  Loading,
  Success,
}: {
  Failure: CellStatusComponentBuilder<T, R>
  Loading: CellStatusComponentBuilder<T, R>
  Success: CellStatusComponentBuilder<T, R>
}) => ReactElement

type CellStatusComponentBuilder<T, R> = (
  state: FetchState<T, R>,
  refresh: () => void,
) => ReactElement

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
