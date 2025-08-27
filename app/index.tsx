import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost, updatePost, patchPostTitle, deletePost, Post } from '../lib/api'; 

export default function HomeScreen() {
  // STATE FOR FORMS
  const queryClient = useQueryClient();
  const [userIdFilter, setUserIdFilter] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  // TANSTACK QUERY HOOKS

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ['posts', userIdFilter || 'all'],
    queryFn: () => fetchPosts(userIdFilter || null),
  });
  
  // Generic mutation hook for handling success and error
  const usePostMutation = (mutationFn: (...args: any[]) => Promise<any>) => {
    return useMutation({
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        Alert.alert('Success', 'The operation was successful!');
      },
      onError: (err: Error) => {
        Alert.alert('Error', err.message);
      },
    });
  };

  const createPostMutation = usePostMutation(createPost);

  const updatePostMutation = usePostMutation(updatePost);

  const patchPostMutation = usePostMutation(patchPostTitle);

  const deletePostMutation = usePostMutation(deletePost);


  // EVENT HANDLERS 
  
  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) {
      Alert.alert('Validation Error', 'Title and body cannot be empty.');
      return;
    }
    createPostMutation.mutate({
      title: newPostTitle,
      body: newPostBody,
      userId: 1,
    });
    setNewPostTitle('');
    setNewPostBody('');
  };
  
  const handleUpdatePost = (postId: number) => {
    updatePostMutation.mutate({
      id: postId,
      title: 'Updated Title (PUT)',
      body: 'This whole post was replaced.',
      userId: 1,
    });
  };

  const handlePatchPost = (postId: number) => {
    patchPostMutation.mutate({ id: postId, title: 'Patched Title (PATCH)' });
  };
  
  const handleDeletePost = (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  // JSX TO RENDER 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>TanStack Query CRUD 🚀</Text>

        {/* FORM */}
        <View style={styles.formContainer}>
          <Text style={styles.subHeader}>📝 Create a New Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Post Title"
            value={newPostTitle}
            onChangeText={setNewPostTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Post Body"
            value={newPostBody}
            onChangeText={setNewPostBody}
          />
          <Button title="Create Post" onPress={handleCreatePost} disabled={createPostMutation.isPending} />
        </View>

        {/* FILTER */}
        <View style={styles.filterContainer}>
          <Text style={styles.subHeader}>🔍 Filter Posts by User ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter User ID (e.g., 1, 2...)"
            keyboardType="numeric"
            value={userIdFilter}
            onChangeText={setUserIdFilter}
          />
        </View>

        {/* POSTS LIST */}
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {isError && <Text style={styles.errorText}>Error: {error.message}</Text>}
        
        {posts?.slice(0, 10).map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.id}: {post.title}</Text>
            <Text>{post.body}</Text>
            <View style={styles.buttonRow}>
              <Button title="Update" onPress={() => handleUpdatePost(post.id)} />
              <Button title="Patch Title" onPress={() => handlePatchPost(post.id)} />
              <Button title="Delete" color="red" onPress={() => handleDeletePost(post.id)} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 20, paddingBottom: 50 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  formContainer: { marginBottom: 20, padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  filterContainer: { marginBottom: 20, padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
  postContainer: { padding: 15, marginVertical: 5, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#f9f9f9' },
  postTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 10 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
});