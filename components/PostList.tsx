import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { Post } from "../hooks/usePosts";

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onPatch: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onEdit, onPatch, onDelete }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>{item.body}</Text>
          <Button title="Edit" onPress={() => onEdit(item)} />
          <Button title="Patch Title" onPress={() => onPatch(item)} />
          <Button title="Delete" onPress={() => onDelete(item)} />
        </View>
      )}
    />
  );
};
