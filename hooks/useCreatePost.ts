import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/api";
import { Post } from "./usePosts";

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newPost: Omit<Post, "id">) => axios.post(API_URL, newPost),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
};
