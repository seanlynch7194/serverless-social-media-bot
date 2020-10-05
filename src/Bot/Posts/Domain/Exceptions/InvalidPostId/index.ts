class InvalidPostId extends Error {
    private constructor(message: string) {
        super(message);
    }

    static tooLong(): InvalidPostId {
        return new InvalidPostId('PostId too long');
    }

    static tooShort(): InvalidPostId {
        return new InvalidPostId('PostId too short');
    }
} 

export default InvalidPostId;
