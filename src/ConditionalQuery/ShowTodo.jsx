import axios from "axios";
import { useQuery } from "react-query";

export function ShowTodo() {
  const { data, isLoading } = useQuery(["todos", 1], () =>
  axios.get("http://localhost:8080/todos/1").then((response) => response.data),
    {
      staleTime: 1000 * 5,
      cacheTime: 1000 * 10,
    }
  );

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div
      style={{
        color: 'white'
      }}
    >
      {data.title}
    </div>
  )
}