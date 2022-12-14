import { React } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>Name: {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Hemisphere: {user.hemisphere}</p>
        <p>Island Name: {user.islandName}</p>
        <p>Native Fruit: {user.nativeFruit}</p>
      </div>
    )
  );
};

export default Profile;