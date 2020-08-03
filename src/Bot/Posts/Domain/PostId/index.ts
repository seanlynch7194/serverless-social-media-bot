export type PostId = {
    getValue: () => string
}

const MakePostId = (id: string): PostId => {
    return {
        getValue: (): string => id,
    }
}

export default MakePostId;
