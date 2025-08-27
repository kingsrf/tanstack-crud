import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/api";

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const usePosts = (userId?: number) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const res = await axios.get<Post[]>(API_URL, { params: userId ? { userId } : {} });
      return res.data;
    },
  });
};
