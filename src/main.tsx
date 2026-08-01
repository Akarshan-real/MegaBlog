import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import { Error, Allposts, Home, Login, Post, Addpost, Editpost, Signup, YourPosts } from "../src/pages/index.ts";
import { Protected } from "../src/components/index.ts";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from "./store/store.ts";

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <Error />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: (
        <Protected authentication={false}>
          <Login />
        </Protected>
      ),
    },
    {
      path: "/signup",
      element: (
        <Protected authentication={false}>
          <Signup />
        </Protected>
      ),
    },
    {
      path: "/user-posts",
      element: (
        <Protected authentication={true}>
          <YourPosts />
        </Protected>
      )
    },
    {
      path: "/all-posts",
      element: (
        <Protected authentication={true}>
          {" "}
          <Allposts />
        </Protected>
      ),
    },
    {
      path: "/add-post",
      element: (
        <Protected authentication={true}>
          {" "}
          <Addpost />
        </Protected>
      ),
    },
    {
      path: "/edit-post/:slug",
      element: (
        <Protected authentication={true}>
          {" "}
          <Editpost />
        </Protected>
      ),
    },
    {
      path: "/post/:slug",
      element: <Post />,
    },
  ],
}]);

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
