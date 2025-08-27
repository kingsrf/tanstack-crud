import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost, Post } from "../lib/api";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: Post) => updatePost(post),
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
