import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutatePatch(fn) {
  const queryClinet = useQueryClient();
  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: (data) => fn(data),
    onSuccess: () => {
      queryClinet.invalidateQueries();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  return { mutate, isSubmitting };
}
