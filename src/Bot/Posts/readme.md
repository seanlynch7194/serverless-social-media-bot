## Posts

## Implementing Additional Social Networks

### Step 1.
Create a new object that implements the Social Network interface `src/Bot/Posts/Domain/SocialNetwork`.

### Step 2.
Next bind your new social network to the container in `src/Bot/Posts/Framework/PostsServiceProvider`. This step is technically optional but if you social network has an dependencies that need injected or you expect the social network to be injected it's self then it's best practice to bind it to the container.

### Step 3. 
Using the `socialNetworks` function in the same service provider pass in your new social network in the constructor array.
