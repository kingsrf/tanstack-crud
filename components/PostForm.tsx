import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import { Post } from "../hooks/usePosts";

interface PostFormProps {
  onSubmit: (data: { title: string; body: string }) => void;
  editPost?: Post | null;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit, editPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setBody(editPost.body);
    }
  }, [editPost]);

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <Button title={editPost ? "Update Post" : "Create Post"} onPress={() => onSubmit({ title, body })} />
    </View>
  );
};
