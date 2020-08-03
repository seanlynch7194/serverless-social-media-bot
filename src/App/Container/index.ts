let providers = {};

export const bind = (name: string, factory: Function) => {
    providers[name] = factory;
}

export const resolve = (name: string) => {
    return providers[name]();
}
