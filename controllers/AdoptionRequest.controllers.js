const AdoptionRequest = require('../models/AdoptionRequest');

const createAdoptionRequest = async (req, res) =>  {
    try {
        const { petId, name, address, phoneNumber, cccd, userId } = req.body;

        const adoptionRequest = new AdoptionRequest({
            pet: petId,
            name,
            address,
            phoneNumber,
            cccd,
            user: userId
        });

        const savedAdoptionRequest = await adoptionRequest.save();
        res.status(201).json({ message: 'Adoption request created successfully', data: savedAdoptionRequest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create adoption request', error });
    }
}

// get All
const getAllAdoptionRequest = async (req, res) => {
    try {
        const adoptionRequests = await AdoptionRequest.find();
        res.status(200).json({ data: adoptionRequests, message: 'Adoption requests retrieved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get adoption requests', error });
    }
}


// update status
const updateStatusAdoptionRequest = async (req, res) => {
    try {
        const { id, status } = req.body;

        const updatedAdoptionRequest = await AdoptionRequest.findByIdAndUpdate({ _id: id }, { status }, { new: true });
        if (!updatedAdoptionRequest) {
            return res.status(404).json({ message: 'Adoption request not found' });
        }
        res.status(200).json({ message: 'Adoption request status updated successfully', data: updatedAdoptionRequest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update adoption request status', error });
    }
}



module.exports = {
    createAdoptionRequest, getAllAdoptionRequest, updateStatusAdoptionRequest
}
