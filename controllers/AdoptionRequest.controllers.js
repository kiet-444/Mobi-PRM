const AdoptionRequest = require('../models/AdoptionRequest');
const Pet = require('../models/Pet');

const createAdoptionRequest = async (req, res) => {
    try {
        const { petId, name, address, phoneNumber, cccd } = req.body;
        const userId = req.userId;  // Lấy userId từ token (đã xác thực)

        // Kiểm tra nếu petId và userId không hợp lệ
        if (!petId || !userId) {
            return res.status(400).json({ message: 'Pet ID and User ID are required' });
        }

        // Kiểm tra xem petId có tồn tại trong cơ sở dữ liệu hay không
        const petExists = await Pet.findById(petId);
        if (!petExists) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Tạo một yêu cầu nhận nuôi mới
        const adoptionRequest = new AdoptionRequest({
            pet: petId,
            user: userId,  // Sử dụng userId đã xác thực từ token
            name,
            address,
            phoneNumber,
            cccd,
        });

        // Lưu yêu cầu nhận nuôi vào cơ sở dữ liệu
        const savedAdoptionRequest = await adoptionRequest.save();
        res.status(201).json({ message: 'Adoption request created successfully', data: savedAdoptionRequest });
    } catch (error) {
        console.error('Error creating adoption request:', error);
        res.status(500).json({ message: 'Failed to create adoption request', error: error.message });
    }
}

// get All
const getAllAdoptionRequest = async (req, res) => {
    try {
        // Kiểm tra userId để đảm bảo nó tồn tại trong token
        if (!req.userId) {
            return res.status(400).json({ message: 'User ID is not available' });
        }

        // Kiểm tra xem người dùng là admin hay user
        if (req.userRole === 'admin') {
            // Nếu là admin, trả về tất cả các yêu cầu nhận nuôi
            const adoptionRequests = await AdoptionRequest.find();
            return res.status(200).json({ data: adoptionRequests, message: 'All adoption requests retrieved successfully' });
        } else {
            // Nếu là user, chỉ trả về yêu cầu nhận nuôi của tài khoản đó
            const adoptionRequests = await AdoptionRequest.find({ user: req.userId }); // Sửa trường 'userId' thành 'user'
            if (adoptionRequests.length === 0) {
                return res.status(404).json({ message: 'No adoption requests found for this user' });
            }
            return res.status(200).json({ data: adoptionRequests, message: 'Your adoption requests retrieved successfully' });
        }
    } catch (error) {
        console.error('Error retrieving adoption requests:', error);
        res.status(500).json({ message: 'Failed to retrieve adoption requests', error: error.message });
    }
}
// update status
const updateStatusAdoptionRequest = async (req, res) => {
    try {
        const { id, status } = req.body;

        const updatedAdoptionRequest = await AdoptionRequest.findByIdAndUpdate(
            { _id: id }, 
            { status }, 
            { new: true }
        );

        if (!updatedAdoptionRequest) {
            return res.status(404).json({ message: 'Adoption request not found' });
        }
        
        res.status(200).json({ message: 'Adoption request status updated successfully', data: updatedAdoptionRequest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update adoption request status', error: error.message });
    }
}



module.exports = {
    createAdoptionRequest, getAllAdoptionRequest, updateStatusAdoptionRequest
}
