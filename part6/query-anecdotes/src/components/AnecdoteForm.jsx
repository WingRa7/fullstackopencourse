import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotifyDispatch } from "../NotifyContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotifyDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatch({ type: "NEW", payload: newAnecdote.content });
      setTimeout(() => {
        dispatch({ type: "RESET" });
      }, 5000);
    },
    onError: (error) => {
      const errorMessage = error.response.data.error;
      dispatch({ type: "ERROR", payload: errorMessage });
      setTimeout(() => {
        dispatch({ type: "RESET" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
