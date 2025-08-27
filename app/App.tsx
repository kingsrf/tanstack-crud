import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, Alert } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { usePosts } from "../hooks/usePosts";
import { useCreatePost } from "../hooks/useCreatePost";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { usePatchPost } from "../hooks/usePatchPost";
import { useDeletePost } from "../hooks/useDeletePost";

import { PostForm } from "../components/PostForm";
import { PostList } from "../components/PostList";
import { Post } from "../lib/api";

// This component contains all the app logic and uses the hooks.
// It will be rendered inside the QueryClientProvider.
function PostsScreen() {
  const [userIdFilter, setUserIdFilter] = useState<number | undefined>();
  const [editPost, setEditPost] = useState<Post | null>(null);

  const { data: posts, isLoading, isError } = usePosts(userIdFilter);
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const patchPostMutation = usePatchPost();
  const deletePostMutation = useDeletePost();

  const handleSubmit = (data: { title: string; body: string }) => {
    if (editPost) {
      updatePostMutation.mutate({ ...data, id: editPost.id, userId: editPost.userId });
    } else {
      createPostMutation.mutate({ ...data, userId: 1 });
    }
    setEditPost(null);
  };

  const handlePatch = (post: Post) => {
    patchPostMutation.mutate({ id: post.id, title: "- Patched Title -" });
    Alert.alert("Patched!", `Post ${post.id} title has been updated.`);
  };

  const handleDelete = (post: Post) => {
    deletePostMutation.mutate(post.id);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Posts</Text>
      <TextInput
        placeholder="Filter by userId"
        keyboardType="numeric"
        value={userIdFilter?.toString() || ""}
        onChangeText={(text) => setUserIdFilter(Number(text) || undefined)}
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />

      <PostForm editPost={editPost} onSubmit={handleSubmit} />
      
      {isLoading && <Text>Loading posts...</Text>}
      {isError && <Text>Error fetching posts.</Text>}
      
      {posts && (
        <PostList
          posts={posts}
          onEdit={setEditPost}
          onPatch={handlePatch}
          onDelete={handleDelete}
        />
      )}
    </SafeAreaView>
  );
}

// The root App component now ONLY sets up the provider
export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PostsScreen />
    </QueryClientProvider>
  );
}