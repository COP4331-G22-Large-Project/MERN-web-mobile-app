const assert = require("assert");
const httpMock = require("nodes-mocks-http");
const login_router = require("../login/login_router");

describe("Example", () => {
	it("should return 'success'", () => {
		const mockRequest = httpMocks.createRequest({
			method: "POST",
			url:"/register",
			body: {
					"username": "coydt",
					"password": "peeper71",
					"email": "coydiego@knights.ucf.edu",
					"firstName": "casdfasdf",
					"lastName": "pasdfasdf"
			}
		});

		const mockResponse = httpMocks.createResponse();

		const actualResponseBody = mockResponse._getData();
		const expectedReponseBody = "{ username: coydt, password: peeper71,email: coydiego@knights.ucf.edu, firstName: casdfasdf, lastName: pasdfasdf}";
		
		assert(actualResponseBody, expectedResponseBody);
	});
});
