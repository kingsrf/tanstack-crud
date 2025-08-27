const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = async (userId: string | null): Promise<Post[]> => {
  const url = userId ? `${API_URL}/posts?userId=${userId}` : `${API_URL}/posts`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const createPost = async (newPost: { title: string; body: string; userId: number }): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};

export const updatePost = async (updatedPost: Post): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts/${updatedPost.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedPost),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to update post');
  }
  return response.json();
};

export const patchPostTitle = async ({ id, title }: { id: number; title: string }): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to patch post');
  }
  return response.json();
};

export const deletePost = async (postId: number): Promise<object> => {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
  return response.json();
};
