import { useParams } from "react-router-dom";

export default function UserDetails() {
  const params = useParams();
  return (
    <div>
      <h1>Details of specific user, particularly:</h1>
      <p>{JSON.stringify(params)} :(</p>
    </div>
  );
}
