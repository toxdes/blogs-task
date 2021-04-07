import { useParams, useLocation } from "react-router-dom";

export default function UserDetails(props: any) {
  const params = useParams();
  const location: any = useLocation();
  if (!location.state) {
    return (
      <div>
        <h1>Fetch user details individually.</h1>
        <p>for username {params.id}</p>
        <p>Currently, don't know the api to do so.</p>
      </div>
    );
  }
  const user = location.state.user;
  const posts = location.state.posts;
  const onNameClick = (e: any, id: string) => {
    alert(`Navigate to post ${id}. Not implemented yet.`);
  };
  return (
    <div className="details">
      <div className="profile">
        <h1>{user.name}</h1>
        <a href={`/u/${user.username}`}>@{user.username}</a>
        <p>
          Works at{" "}
          <a href={user.website}>
            <b>{user.company.name}</b>
          </a>
        </p>

        <p>
          Lives at{" "}
          <a
            href={`http://maps.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
            target="_blank"
            rel="noreferrer"
          >
            <b>
              {user.address.street}, {user.address.suite}, {user.address.city}.
              (zip: {user.address.zipcode})
            </b>
          </a>
        </p>
        <p>
          Email{" "}
          <span>
            <a href={`mailto://${user.email}`}>{user.email}</a>
          </span>
        </p>

        <p>
          Phone{" "}
          <span>
            <a href={`tel://${user.email}`}> {user.phone}</a>
          </span>
        </p>
        {/* <p>{JSON.stringify(user)}</p>
        <p>{JSON.stringify(posts)}</p> */}
      </div>
      <h1>Posts by {user.name}</h1>
      {posts ? (
        <div className="posts">
          {posts &&
            posts.map((each: any) => {
              return (
                <div className="post" key={each.title}>
                  <button
                    onClick={(e) => onNameClick(e, each.id)}
                    className="link"
                  >
                    {each.title}
                  </button>
                  <p>{each.body}</p>
                </div>
              );
            })}
        </div>
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}
