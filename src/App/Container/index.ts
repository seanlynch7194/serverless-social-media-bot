let providers:any = {};

export const bind = (name: string, factory: Function) => {
    providers[name] = factory;
}

export const resolve = (name: string) => {
    if (!providers[name]) {
        throw new Error(`${name} is not bound to the container`);
    }

    return providers[name]();
}
