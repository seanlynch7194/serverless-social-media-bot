export type PostContent = {
    getValue: () => string,
};

export const MakePostContent = (content: string): PostContent => {
    return {
        getValue: () => content,
    }
}
