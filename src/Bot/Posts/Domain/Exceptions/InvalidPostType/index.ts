class InvalidPostType extends Error {
    private constructor(message: string) {
        super(message);
    }

    static fromType(type: string): InvalidPostType {
        return new InvalidPostType(`Invalid post type: ${type}`);
    }
} 

export default InvalidPostType;
