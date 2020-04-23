import { useEffect, useReducer, useRef } from 'react';

function useSetState(initialState) {
  return useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    initialState
  );
}
function useSafeSetState<T>(initialState: T) {
  const [state, setState] = useSetState(initialState);
  const mountedRef = useRef(false);
  useEffect((): (() => void) => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);
  // @ts-ignore
  const safeSetState = (...args: []) => mountedRef.current && setState(...args);
  return [state, safeSetState];
}

export { useSafeSetState };
