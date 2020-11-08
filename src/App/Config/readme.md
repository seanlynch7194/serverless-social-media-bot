# Config

All of the configuration files are stored in the Config directory. A separate file should be added for each distict configuration for example services like `aws` and `sentry` as well as more abstract configuration like `app`, `logging`, `cache`, or `database`.

By using configuration files we can further abstract any environment variables. It's bad practice to directly access the ENV variables so instead create a configuration file and set the value using an ENV variable.

## Usage

The configuration values may be accessed using "dot" syntax, which includes the name of the file and option you wish to access. A default value may also be specified and will be returned if the configuration option does not exist.

```javascript
import { config } from './';

const postsTable = config('app.postsTable', 'defaultTableName');
```

While this is not a common use case it is possible to set individual configuration values. Typically all configuration values will be set at build time in the ConfigStore.

```javascript
import { set } from './';

const postsTable = set('custom.cacheDuration', 300);
```

Similar to setting a value you can also reset the entire config but this is again not recommended and is primiarly used for unit testing.

```javascript
import { reset } from './';

reset();
```

