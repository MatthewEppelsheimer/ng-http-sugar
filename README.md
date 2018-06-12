# HTTP Sugar

Syntactic sugar for Angular's built-in HttpClient

**Requires Angular 6.0.0 or later.**

**License: GPL 2.0 or later.**

## What it does ##

This currently only supports `POST` requests. `GET` and other types that `HttpClient` supports are not yet supported.

## Code Example ##

Without this, here's what you need to do to make an HTTP `POST` request with headers parameters, and callbacks for success and error responses using Angular's included `HttpService`:

```typescript
import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpParams
} from '@angular/common/http';

@Injectable()
export class MyService {
	constructor(httpService: HttpService) {}

	mySuccessCallback(payload: any, responseData: any) {
		/* do something with success response */
	}

	myErrorCallback(payload: any, error: any) {
		/* do something with error response */
	}

	public methodThatMakesARequest(): void {
		// API route for your request
		let apiRoute = 'https://example.com/api/endpoint';

		// Payload to send with your request
		let myPayload = { /* payload */ };

		// Prepare request headers
		myRequestHeaders: Array<{name: string, value: string}> = [
			/* add request headers here, e.g.: */
			{name: 'SomeHeader', value: 'SomeValue'},
		];

		let headerArg = new HttpHeaders();

		headers.forEach((header) => {
			headerArg = headerArg.set(header.name,header.value);
		});

		// Include default 'content-type' header
		// (This is included by HttpService in the next example)
		if (! headerArg.has('Content-Type')) {
			headerArg = headerArg.set('Content-Type','application/json');
		}

		// Prepare request params
		myRequestParams: Array<{id: string, value: string}> = [
			/* add request params here, e.g.: */
			{id: 'SomeParam', value: 'SomeValue'},
		];

		let paramsArg = new HttpParams();

		params.forEach((header) => {
			paramsArg = 	paramsArg.set(params.id,params.value);
		});


		this.httpService.post(
			apiRoute,
			myPayload,
			{
				headers: headerArg,
				params: paramsArg,
			}
		).subscribe(
			data => {
				mySuccessCallback(myPayload,data);
			},
			error => {
				myErrorCallback(myPayload,error);
			}
		);
	}
}

```

With `HttpService`, you can make the same request much more compactly:

```typescript
import { Injectable } from '@angular/core';
import { HttpService } from 'http-sugar';

@Injectable()
export class MyService {
	constructor(private _http: HttpService) {}

	mySuccessCallback(payload: any, responseData: any) {
		/* do something with success response */
	}

	myErrorCallback(payload: any, error: any) {
		/* do something with error response */
	}

	public methodThatMakesARequest(): void {
		// API route for your request
		let apiRoute = 'https://example.com/api/endpoint';

		// Payload to send with your request
		let myPayload = { /* payload */ };

		// Optional array of request header name/value objects
		myRequestHeaders: Array<{name: string, value: string}> = [
			/* add request headers here, e.g.: */
			{name: 'SomeHeader', value: 'SomeValue'},
		];

		// Optional array of request param id/value objects
		myRequestParams: Array<{id: string, value: string}> = [
			/* add request params here, e.g.: */
			{id: 'SomeParam', value: 'SomeValue'},
		];

		// This handles preparing HttpHeaders and HttpParams for you, as well
		// as subscribing to the response observable to fire callbacks needed.
		this._http.post(
			apiRoute,
			myPayload,
			myRequestHeaders, // optional
			myRequestParams, // optional
			this.mySuccessCallback, // optional
			this.myErrorCallback, // optional
		);
	}
}
```

## What's Included ##

1. `HttpSugar` is this module. Include it in your Angular application to use its functionality.
2. `HttpService` is an injectable Angular service you can use in your own services, in place of `HttpClient` and its helper types.

## How to Use ##

### Including in your application ###

1. Include this module in your Angular 6.x or later project with `npm install --save 'ng-http-sugar'`.
2. Where needed in your application's code, import the following from the module to make calls on:

```typescript
import { HttpService } from 'http-sugar';
```

## Roadmap ##

- Add test coverage!
- Support `GET` requests
- Support `PUT` requests
- Support `PATCH` requests
- Support `DELETE` requests
- Maybe support Angular `4.x` and later, instead of `6.x` and later?
	- Upgrading from `4.x` to `6.x` isn't terribly onerous in most cases, so I'll only work on this if I get requests for it.

## Maintenance ##

### Build ###

Run `ng build http-sugar --prod` to build the library. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Publish updates to NPM ###

```bash
# manually increment version in package.json
# avoid git tags since we're publishing from `dist/` later
npm --no-git-tag-version -f version [major|minor|patch]

# build
ng build http-sugar --prod

# switch to built package
cd dist/http-sugar/

# publish update npm
npm publish
```

### Run tests ###

**There currently are no tests!**

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
