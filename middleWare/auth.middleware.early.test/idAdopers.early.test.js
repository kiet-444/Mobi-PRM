
// Unit tests for: idAdopers




const { idAdopers } = require('../middleware/auth.middleware');
const { verifyToken, isAdmin, isUserOrAdmin } = require('../auth.middleware');

// auth.middleware.test.js
describe('idAdopers() idAdopers method', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            userRole: null
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    // Happy Path
    describe('Happy Path', () => {
        it('should call next if userRole is "adopter"', () => {
            // Arrange: Set userRole to 'adopter'
            req.userRole = 'adopter';

            // Act: Call the middleware
            idAdopers(req, res, next);

            // Assert: Ensure next is called and no response is sent
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    // Edge Cases
    describe('Edge Cases', () => {
        it('should return 403 if userRole is not "adopter"', () => {
            // Arrange: Set userRole to something other than 'adopter'
            req.userRole = 'admin';

            // Act: Call the middleware
            idAdopers(req, res, next);

            // Assert: Ensure 403 response is sent
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
            expect(next).not.toHaveBeenCalled();
        });

        it('should return 403 if userRole is undefined', () => {
            // Arrange: Leave userRole as undefined

            // Act: Call the middleware
            idAdopers(req, res, next);

            // Assert: Ensure 403 response is sent
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
            expect(next).not.toHaveBeenCalled();
        });

        it('should return 403 if userRole is null', () => {
            // Arrange: Explicitly set userRole to null
            req.userRole = null;

            // Act: Call the middleware
            idAdopers(req, res, next);

            // Assert: Ensure 403 response is sent
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
            expect(next).not.toHaveBeenCalled();
        });

        it('should return 403 if userRole is an empty string', () => {
            // Arrange: Set userRole to an empty string
            req.userRole = '';

            // Act: Call the middleware
            idAdopers(req, res, next);

            // Assert: Ensure 403 response is sent
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
            expect(next).not.toHaveBeenCalled();
        });
    });
});

// End of unit tests for: idAdopers
