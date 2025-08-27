# React Native (Expo) CRUD App

I built this project to learn and demonstrate how to manage server state in a mobile app. It's a basic application that performs all the main CRUD (Create, Read, Update, Delete) operations using TanStack Query. For the backend, I used the free JSONPlaceholder API to practice with some fake data.

## What I Implemented

Here are the main features I built into the app:

    Fetch Posts: I started by fetching a list of posts from the API and showing them on the screen.

    Filter Posts: I added a way for users to filter the posts by their user ID.

    Create Post: I included a form so you can submit a new post.

    Update Post (PUT): I added an edit option to completely replace a post with new information.

    Patch Post (PATCH): I also made a way to update just one part of a post, like its title.

    Delete Post: Finally, I added a button to delete a post.

What I Used

These are the main technologies and libraries I used to put this together:

    React Native (Expo): I used this to build the mobile app itself.

    TypeScript: I wrote the code in TypeScript to help catch errors and keep things organized.

    TanStack Query: This was the key library I used for handling all the data fetching and state management.

    Expo Router: I used this for setting up the screens and navigation in the app.

    JSONPlaceholder: This is the fake online API I used to practice making requests.

How to Run It

    Node.js installed on your computer.

    The Expo Go app on your phone (or a simulator on your computer).

    Clone the project:
      git clone <your-repository-url>
      cd <your-project-directory>

   Install the dependencies:
      npm install

   Start the server:

   npx expo start -c 
      -  ('-c' flag, tells Expo to clear the bundler cache before starting up.)
