import { useEffect, useMemo, useRef } from "react";

// https://javascript.plainenglish.io/react-useevent-the-latest-and-greatest-react-hook-56ae71febbf3
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEvent = <T extends (...args: any[]) => any>(
  callback: T | undefined
): T => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
};
