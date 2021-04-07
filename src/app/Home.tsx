import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

// sort alphabetically based on object property
const alphabetically = (a: any, b: any, selector: any) => {
  if (selector(a) < selector(b)) return -1;
  if (selector(a) > selector(b)) return 1;
  return 0;
};

// transform data to required format
const digest = (data: any) => {
  if (!data || !data.users || !data.posts) {
    return;
  }
  return data.users
    .sort((a: any, b: any) => alphabetically(a, b, (each: any) => each.name))
    .map((each: any) => {
      return {
        name: each.name,
        userId: each.id,
        posts: data.posts
          .filter((post: any) => post.userId === each.id)
          .sort((a: any, b: any) =>
            alphabetically(a, b, (each: any) => each.title)
          ),
      };
    });
};

interface PostsProps {
  data?: any;
  onNameClick: (e: any, id: string) => void;
}

function Posts({ data, onNameClick }: PostsProps) {
  console.log(data);
  let digested = digest(data);
  return (
    <div className="posts">
      {digested &&
        digested.map((each: any) => {
          return (
            <div className="post" key={each.name}>
              <button
                onClick={(e) => onNameClick(e, each.userId)}
                className="link"
              >
                {each.name}
              </button>
              {each.posts &&
                each.posts.map((post: any) => {
                  return (
                    <div className="item">
                      <h3 onClick={() => alert("Not implemented yet.")}>
                        {post.title}
                      </h3>
                      <p key={post.id}>{post.body}</p>
                    </div>
                  );
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
  const navigate = useNavigate();
  const onNameClick = (e: any, id: string) => {
    let userDetails = data.data.users.filter((each: any) => each.id === id)[0];
    let postsByUser = data.data.posts
      .filter((each: any) => each.userId === id)
      .sort((a: any, b: any) => alphabetically(a, b, (a: any) => a.title));
    navigate(`/u/${userDetails.username}`, {
      state: { user: userDetails, posts: postsByUser },
    });
  };
  const onAddUser = (user: any) => {
    let newUsers = [...data.data.users];
    const u = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        street: user.street,
        suite: user.suite,
        city: user.city,
        zipcode: user.zipcode,
      },
      phone: user.phone,
      website: user.website,
      company: {
        name: user.companyname,
        catchPhrase: user.catchphrase,
        bs: user.bs,
      },
    };
    newUsers.push(u);
    setData({ ...data, data: { ...data.data, users: newUsers } });
  };
  const signup = () => {
    navigate("/signup", { state: { onSuccess: onAddUser } });
  };
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
      <div className="header">
        <h1>Welcome.</h1>
        <button onClick={signup}>Sign up</button>
      </div>
      <p>You might like these posts.</p>
      <Posts data={data.data} onNameClick={onNameClick} />
    </div>
  );
}
