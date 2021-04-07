import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { GlobalStateContext } from ".";
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
// list of posts component
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

// home component

export default function Home() {
  // data -> state with status, and actual fetched data
  // const [data, setData] = useState<GenericDataType>({ status: "idle" });
  const navigate = useNavigate();
  const { globalState, setGlobalState }: any = useContext(GlobalStateContext);
  // navigate to user profile
  const onNameClick = (e: any, id: string) => {
    let userDetails = globalState.data.users.filter(
      (each: any) => each.id === id
    )[0];
    let postsByUser = globalState.data.posts
      .filter((each: any) => each.userId === id)
      .sort((a: any, b: any) => alphabetically(a, b, (a: any) => a.title));
    navigate(`/u/${userDetails.username}`, {
      state: { user: userDetails, posts: postsByUser },
    });
  };

  // navigate to signup
  const signup = () => {
    navigate("/signup");
  };

  // fetch posts
  const fetchUsers = React.useCallback(async () => {
    try {
      setGlobalState((state: any) => {
        return { ...state, status: "fetching" };
      });
      let posts = await api.get("/posts");
      let users = await api.get("/users");
      posts = posts.data;
      users = users.data;
      if (!posts) {
        throw new Error("No posts.");
      }
      console.log(posts);
      setGlobalState({ status: "success", data: { users, posts } });
    } catch (e) {
      console.error(e);
      setGlobalState({ status: "error", data: e });
    }
  }, [setGlobalState]);

  // loading !
  if (!globalState.data && globalState.status === "idle") {
    fetchUsers();
  }
  if (globalState.status === "fetching") {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="home">
      <div className="header">
        <h1>Welcome.</h1>
        <button onClick={signup}>Sign up</button>
      </div>
      <p>You might like these posts.</p>
      <Posts data={globalState.data} onNameClick={onNameClick} />
    </div>
  );
}
