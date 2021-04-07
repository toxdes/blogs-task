import React, { useState, useEffect } from "react";
import api from "./api";

const digest = (data: any) => {
  if (!data || !data.users || !data.posts) {
    return;
  }
  return data.users.map((each: any) => {
    return {
      name: each.name,
      posts: data.posts.filter((post: any) => post.userId === each.id),
    };
  });
};

interface PostsProps {
  data?: any;
}

function Posts({ data }: PostsProps) {
  console.log(data);
  let digested = digest(data);
  return (
    <div className="posts">
      {digested &&
        digested.map((each: any) => {
          return (
            <div className="post" key={each.name}>
              <h3>{each.name}</h3>
              {each.posts &&
                each.posts.map((post: any) => {
                  return <p key={post.id}>{post.title}</p>;
                })}
            </div>
          );
        })}
    </div>
  );
}

interface GenericDataType {
  status: string;
  data?: any;
}
export default function Home() {
  const [data, setData] = useState<GenericDataType>({ status: "idle" });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setData((data) => {
          return { ...data, status: "fetching" };
        });
        let posts = await api.get("/posts");
        let users = await api.get("/users");
        posts = posts.data;
        users = users.data;
        if (!posts) {
          throw new Error("No posts.");
        }
        console.log(posts);
        setData({ status: "success", data: { users, posts } });
      } catch (e) {
        console.error(e);
        setData({ status: "error", data: e });
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <h1>Welcome.</h1>
      <p>You might like these posts.</p>
      <Posts data={data.data} />
    </div>
  );
}
