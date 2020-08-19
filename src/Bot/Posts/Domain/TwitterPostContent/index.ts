import PostContentTooLong from '../Exceptions/PostContentTooLong';
import { PostContent, MakePostContent } from '../PostContent';

const TWEET_MAX_LENGTH = 280;

export type TwitterPostContent = PostContent;

const MakeTwitterPostContent = (content: string): TwitterPostContent => {
    if (content.length > TWEET_MAX_LENGTH) {
        throw PostContentTooLong.withMax(TWEET_MAX_LENGTH);
    }

    return MakePostContent(content);
}

export default MakeTwitterPostContent;
