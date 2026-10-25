import { useEffect, useState } from "react";
import { api } from "../lib/api";

export function useContent() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    api
      .getContent()
      .then((data) => !cancelled && setContent(data))
      .catch((err) => !cancelled && setError(err));

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, error };
}
