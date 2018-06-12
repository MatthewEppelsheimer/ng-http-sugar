import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpParams
} from '@angular/common/http';

/*
 * Sugar for Angular's HttpClient to send 'POST' HTTP requests
 */
@Injectable({
	providedIn: 'root',
})
export class HttpService {
	constructor(private http: HttpClient) {}

	/*
	 * Send an HTTP 'POST' request
	 *
	 * This supports including a payload of JSON data with optional HTTP headers
	 * and params, as well as succcess and error callbacks.
	 *
	 * @NOTE This always prepares a 'Content-Type' HTTP request headers for
	 *       sending JSON data. Manually set a different value for this header
	 *       if you need to send a different kind of data.
	 *
	 * @param path				complete path to send POST request e.g.
	 * 							`https://example.com/somepath`
	 * @param payload			(optional) JSON data to send request
	 * @param headers			(optional) array of HTTP headers to send
	 * @param params			(optional) array of HTTP params to send
	 * @param successCallback	(optional) code run upon successful response
	 * @param errorCallback		(optional) code run upon UNsuccessful response
	 */
	public post(
		path: string,
		payload: any = null,
		headers?: Array<{name: string, value: string}>,
		params?: Array<{id: string, value: string}>,
		successCallback?: (dataSent: any, dataReceived: any) => void,
		errorCallback?: (dataSent: any, dataReceived: any) => void
	): void {
		// prep payload
		let readyPayload: any;
		if (null === payload) {
			readyPayload = null;
		} else {
			readyPayload = JSON.stringify(payload);
		}

		// prep headers and params
		let headerArg = this._prepHeaders(headers);
		let paramsArg = this._prepParams(params);

		// The Business
		this.http.post(
			path,
			readyPayload,
			{
				headers: headerArg,
				params: paramsArg,
			}
		).subscribe(
			data => {
				if (successCallback) {
					successCallback(payload,data);
				}
			},
			error => {
				if (errorCallback) {
					errorCallback(payload,error);
				}
			}
		);
	}

	/*
	 * Prep an HttpHeaders object
	 *
	 * Optionally accept an array of {name, value} header objects. This is kept
	 * optional so that it can always be called as a helper by request handler
	 * methods, even when it isn't needed; this method is responsible for
	 * determining whether headers need to be added.
	 */
	private _prepHeaders(
		headers?: Array<{name: string, value: string}>,
		type: string = 'json'
	): HttpHeaders {
		let headerArg = new HttpHeaders();

		if (headers) {
			headers.forEach((header) => {
				headerArg = headerArg.set(header.name,header.value);
			});
		}
		// Default 'content-type' header for JSON requests
		if (! headerArg.has('Content-Type') && 'json' === type) {
			headerArg = headerArg.set('Content-Type','application/json');
		}

		return headerArg;
	}

	/*
	 * Prep an HttpParams object
	 *
	 * Optionally accept an array of {name, value} header objects.
	 */
	private _prepParams(params?: Array<{id: string, value: string}>): HttpParams {
		let paramsArg = new HttpParams();

		if (params) {
			params.forEach((param) => {
				paramsArg = paramsArg.set(param.id,param.value);
			});
		}

		return paramsArg;
	}
}
