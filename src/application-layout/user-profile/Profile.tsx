import React, {Fragment, FunctionComponent} from 'react'
import { useAuth0 } from "../../react-auth0-spa";

const Profile: FunctionComponent = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {(loading || !user) && <div>Loading...</div>}
      {(!loading && user) && <Fragment>
        <img src={user.picture} alt="Profile" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <code>{JSON.stringify(user, null, 2)}</code>
      </Fragment>}
    </>
);
};

export default Profile;