import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPostTitle } from "../lib/api";

export function usePatchPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      patchPostTitle({ id, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
