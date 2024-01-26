/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @readonly
 * @enum
 */
export const SMTPErrorStates = {
	COULDNOTCONNECT: 1,
	BADRESPONSE: 2,
	AUTHFAILED: 3,
	TIMEDOUT: 4,
	ERROR: 5,
	NOCONNECTION: 6,
	AUTHNOTSUPPORTED: 7,
	CONNECTIONCLOSED: 8,
	CONNECTIONENDED: 9,
	CONNECTIONAUTH: 10,
} as const;

export class SMTPError extends Error {
	public code: number | null = null;
	public smtp: unknown = null;
	public previous: Error | null = null;

	/**
	 * @protected
	 * @param {string} message error message
	 */
	protected constructor(message: string) {
		super(message);
	}

	/**
	 *
	 * @param {string} message error message
	 * @param {number} code smtp error state
	 * @param {Error | null} error previous error
	 * @param {unknown} smtp arbitrary data
	 * @returns {SMTPError} error
	 */
	public static create(
		message: string,
		code: number,
		error?: Error | null,
		smtp?: unknown
	) {
		const msg = error?.message ? `${message} (${error.message})` : message;
		const err = new SMTPError(msg);

		err.code = code;
		err.smtp = smtp;

		if (error) {
			err.previous = error;
		}

		return err;
	}
}
