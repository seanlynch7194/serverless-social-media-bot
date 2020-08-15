/**
 * Gets the value of an environment variable.
 * 
 */
const env = (key: string, defaultValue = null): any => {
    const value = process.env[key];
  
    if (!value) {
      return defaultValue;
    }
  
    return processValueType(value);
}

/**
 * All variables in .env files are parsed as strings, so some 
 * reserved values have been created to allow you to return a wider 
 * range of types from the env() function i.e bool and null.
 */
const processValueType = (value: string): any => {
    switch (value.toLowerCase()) {
        case 'true':
        case '(true)':
            return true;

        case 'false':
        case '(false)':
            return false;

        case 'empty':
        case '(empty)':
            return '';

        case 'null':
        case '(null)':
            return;

        default:
            return value;
    }
}

export default env;
