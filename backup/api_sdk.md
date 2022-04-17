## @ngx-props-api/api-sdk

### public-api.ts

> ! Not supported like this

```typescript
export * as utils from './lib/utils/propsObjectUtils';
export * as json from './lib/utils/propsJsonUtils';
export * as stringUtils from './lib/utils/propsStringUtils';
export * as validatorUtils from './lib/utils/propsValidatorUtils';
export * as nmUtils from './lib/utils/propsNmUtils';
```

> base

```typescript
export * from './lib/ngx-props-api.service';
export * from './lib/ngx-props-api.component';
export * from './lib/ngx-props-api.module';
```

> utils

```typescript
export * from './lib/utils/propsObjectUtils';
export * from './lib/utils/propsJsonUtils';
export * from './lib/utils/propsStringUtils';
export * from './lib/utils/propsValidatorUtils';
export * from './lib/utils/propsNmUtils';
export * from './lib/utils/propsLoggerUtils';
```

> enums

```typescript
export * from './lib/model/enums/propsConstEnum';
```

> services

```typescript
export * from './lib/services/ngx-alert.service';
export * from './lib/services/ngx-cache.service';
export * from './lib/services/handler/ngx-cache-handler.service';
export * from './lib/services/ngx-request-stick.service';
export * from './lib/services/ngx-storages.service';
export * from './lib/services/ngx-toaster-builder.service';
export * from './lib/services/ngx-toaster.service';
export * from './lib/services/handler/ngx-toaster-handler.service';
```

> interceptors

```typescript
// export * from './lib/configs/middleware/index';
export * from './lib/configs/middleware/ngx-request-cache.interceptor';
export * from './lib/configs/middleware/ngx-request-retry.interceptor';
export * from './lib/configs/middleware/ngx-request-stick.interceptor';
```