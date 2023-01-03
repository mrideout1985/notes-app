import { useEffect, useState } from "react";

export interface Data {
  body: string;
  createdAt: string;
  description: string;
  id: number;
  published: boolean;
  title: string;
  updatedAt: string;
  userEmail: string;
}

function useGetUserNotes(): {
  data: Data[] | undefined;
  done: boolean;
  error: string | undefined;
} {
  const [data, setData] = useState<Data[]>();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    if (jwtToken) {
      fetch("http://localhost:3000/articles/my-articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then(async (res) => await res.json())
        .then((res) => {
          if (res) {
            setData(res);
            setDone(true);
          }
        })
        .catch((error) => {
          if (error) {
            setError(error);
          }
        });
    }
  }, [jwtToken]);

  return {
    data,
    done,
    error,
  };
}

export default useGetUserNotes;
