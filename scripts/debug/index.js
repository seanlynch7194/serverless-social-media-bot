console.log(process.env);


console.log('ptn_join', process.env.POSTS_TABLE_NAME.split('').join('.'));
console.log('ter_join', process.env.TEST_ENV_REPLACEMENT.split('').join('.'));