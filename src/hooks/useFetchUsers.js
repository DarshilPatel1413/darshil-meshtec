import { useEffect, useState } from "react";

export default function useFetchUsers(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let show = true;

    async function fetchUsers() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("not fetch users");
        // console.log(res);

        const json = await res.json();

        if (show) {
          setData(json);
          localStorage.setItem("users", JSON.stringify(json));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    const stored = localStorage.getItem("users");

    // console.log("stored users", stored);

    if (stored) {
      setData(JSON.parse(stored));
      // console.log( "localStorage", data);
      // console.log( "localStorage", JSON.parse(stored));
      setLoading(false);
    } else {
      fetchUsers();
    }

    return () => {
      show = false;
    };
  }, [url]);

  return { data, setData, loading, error };
}
