import { Post } from "../Post";

export type SocialNetwork = {
    publish: (post: Post) => Promise<void>
};
