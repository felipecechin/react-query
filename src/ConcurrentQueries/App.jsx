import "./App.css";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

function App() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(["todos"], () =>
    axios.get("http://localhost:8080/todos").then((response) => response.data)
  );

  const mutation = useMutation({
    mutationFn: async ({ todoId, completed }) => {
      const response = await axios
        .patch(`http://localhost:8080/todos/${todoId}`, {
          completed,
        });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["todos"], (currentData) =>
        currentData.map((todo) => (todo.id === data.id ? data : todo))
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }
  if (mutation.isLoading) {
    return <div className="loading">Carregando mudança de dados...</div>;
  }

  if (error) {
    return <div className="loading">Algo deu errado!</div>;
  }

  return (
    <div className="app-container">
      <div className="todos">
        <h2>Todos & React Query</h2>
        {data.map((todo) => (
          <div
            onClick={() =>
              mutation.mutate({ todoId: todo.id, completed: !todo.completed })
            }
            className={`todo ${todo.completed && "todo-completed"}`}
            key={todo.id}
          >
            {todo.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
