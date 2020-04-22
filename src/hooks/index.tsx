import React, { useEffect, useReducer, useRef } from 'react';

type useSetStateType = {
  initialState: number | string | object | boolean | null;
};
function useSetState(initialState) {
  return useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    initialState
  );
}
function useSafeSetState(initialState) {
  const [state, setState] = useSetState(initialState);
  const mountedRef = useRef(false);
  useEffect((): any => {
    mountedRef.current = true;
    return (): boolean => (mountedRef.current = false);
  }, []);
  const safeSetState = (...args: any) =>
    mountedRef.current && setState(...args);
  return [state, safeSetState];
}

export { useSafeSetState };
