class PostContentTooLong extends Error {
    private constructor(message: string) {
        super(message);
    }

    static withMax(max: number): PostContentTooLong {
        return new PostContentTooLong(`Post Content Cannot Exceed ${max} characters`);
    }
} 

export default PostContentTooLong;
