export type CrossPostId = {
    getValue: () => string,
};

export const MakeCrossPostId = (value: string): CrossPostId => {
    if (value.length > 255) {
        throw new Error('CrossPostId cannot exceed 255 characters')
    }
    return {
        getValue: () => value,
    }
};
