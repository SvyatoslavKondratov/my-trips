type ErrorResponse = {
	[key: string]: any;
	message?: string;
};

export class BackendError extends Error {
	public errorResponse?: ErrorResponse;
	public status: number;

	constructor(message: string, status: number, errorResponse?: ErrorResponse) {
		super(message);
		this.errorResponse = errorResponse;
		this.status = status;
	}
}
