import { useRef, useReducer, useCallback } from "react";

interface UseFetchState {
  isLoading: boolean;
  error: any;
  data: any;
}

type UseFetchAction = {
  type: string;
  payload?: any;
};

/* 
  Check cache enables caching result on client side and prevents retrieving same results again.
  Distinguish only buy URL using it as key.
*/
export const useFetchDogImage = (
  checkCache: boolean = false
): [UseFetchState, (value: string) => void] => {
  const cache: Record<string, any> = useRef({});

  const initialState: UseFetchState = {
    isLoading: false,
    error: null,
    data: []
  };

  const [state, dispatch] = useReducer(
    (state: UseFetchState, action: UseFetchAction) => {
      switch (action.type) {
        case "LOADING":
          return { ...initialState, isLoading: true };
        case "FETCHED":
          return { ...initialState, isLoading: false, data: action.payload };
        case "ERROR":
          return { ...initialState, isLoading: false, error: action.payload };
        default:
          return state;
      }
    },
    initialState
  );

  const fetchData = useCallback(async (url): Promise<any> => {
    dispatch({ type: "LOADING" });
    if (cache.current[url] && checkCache) {
      const data = cache.current[url];
      dispatch({ type: "FETCHED", payload: data });
    } else {
      try {
        const response = await fetch(url);
        const rawData = await response.json();
        let data = rawData?.message;

        // Check if no data was found and update
        if (!data && rawData.status === "success") {
          data = [];
        } else if (!data || rawData.status !== "success") {
          throw Error("There was error.");
        }
        cache.current[url] = data.message;
        dispatch({ type: "FETCHED", payload: data });
      } catch (error) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    }
  }, []);

  return [state, fetchData];
};
