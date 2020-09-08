import React, {Fragment, FunctionComponent} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Profile: FunctionComponent = () => {
  const { isLoading, user } = useAuth0();

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div data-testid='mobb-user-profile'>
      {(isLoading || !user) && <div>Loading...</div>}
      {(!isLoading && user) && <Fragment>
        <img src={user.picture} alt="Profile" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <code>{JSON.stringify(user, null, 2)}</code>
      </Fragment>}
    </div>
);
};

export default Profile;