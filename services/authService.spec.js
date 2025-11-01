const AuthService = require('../services/authService');


describe("AuthService (in-memory)", () => {
  let authService;
  let req, res;

  beforeEach(() => {
    authService = new AuthService();

    // mock request & response
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // set JWT secret for tests
    process.env.JWT_SECRET = "test_secret";
  });

  it("should create a new user successfully", () => {
    req.body = { username: "shihab", email: "test@test.com", password: "1234" };

    authService.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "User created successfully",
        user: expect.objectContaining({
          username: "shihab",
          email: "test@test.com"
        }),
        token: expect.any(String)
      })
    );
  });

  it("should not create a user with duplicate email", () => {
    req.body = { username: "user1", email: "dup@test.com", password: "1111" };
    authService.createUser(req, res);

    req.body = { username: "user2", email: "dup@test.com", password: "2222" };
    authService.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User already exists" })
    );
  });

  it("should verify an existing user", () => {
    req.body = { username: "verify", email: "verify@test.com", password: "123" };
    authService.createUser(req, res);

    // get the user ID from the last created user
    const createdUser = Array.from(authService.users.values())[0];

    req.body = { id: createdUser.id };
    authService.verify(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Login successful",
        token: expect.any(String)
      })
    );
  });

  it("should fail verification if user not found", () => {
    req.body = { id: "invalid_id" };
    authService.verify(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User not found" })
    );
  });
});
