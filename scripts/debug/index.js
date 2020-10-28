console.log(process.env);

console.log('POSTS_TABLE_NAME', process.env.POSTS_TABLE_NAME);
console.log('POSTS_TABLE_NAME_join', process.env.POSTS_TABLE_NAME.split('').join('.'));