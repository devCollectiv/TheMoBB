# Map of Black Business(MoBB) 

<a href="auth0.com">Auth0</a> is used for Authentication

To Run the project locally
```
yarn install
yarn start
```

1. Follow <a href="https://localhost:1234">https://localhost:1234</a>
1. You immediately see a sidebar containing the Login Button and a large content section on the right stating
that the content you are seeing is public.
1. Login to the application. 
1. You now have access to an additional sidebar option
1. Click the additional sidebar option and you should see your Profile details including your 
image 

> The Profile option is the additional option. If you do not see that then you have not 
> authenticated correctly and the issue is in the auth0 configuration. 


> If you try to manually
> navigate to the <a href="https://localhost:1234/profile">profile page</a> before logging in you will 
> not see any content. This route uses the private react component and it is protected by auth0 login.  


Currently all users are free to sign up for accounts.