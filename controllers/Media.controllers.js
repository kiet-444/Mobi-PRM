const cloudinary = require('../config/cloudinary.config'); // Adjust the path if necessary
const { PassThrough } = require('stream');
const Media = require('../models/Media');


const upload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.files[0];
        const { buffer } = file;

        const bufferStream = new PassThrough();
        bufferStream.end(buffer);

        cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                try {
                    const media = new Media({
                        id: result.public_id,
                        name: result.original_filename,
                        url: result.secure_url,
                        created_at: result.created_at
                    });

                    await media.save();
                    return res.json({
                        id: result.public_id,
                        name: result.original_filename,
                        url: result.secure_url,
                        created_at: result.created_at
                    });
                } catch (dbError) {
                    console.error('Error saving media to database:', dbError);

                    return res.status(500).json({ error: 'Error saving media to database' });
                }
            }
        ).end(buffer);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        // Xóa media từ Cloudinary trước
        cloudinary.uploader.destroy(id, async (error, result) => {
            if (error) {
                return res.status(500).json({ message: 'Failed to delete from Cloudinary', error });
            }

            // Xóa media khỏi cơ sở dữ liệu MongoDB
            const media = await Media.findOneAndDelete({ id: id });

            if (!media) {
                return res.status(404).json({ message: 'Media not found in database' });
            }

            res.status(200).json({ message: 'Media deleted successfully from Cloudinary and database' });
        });
    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).json({ message: 'Failed to delete media', error });
    }
};


module.exports = {
    upload, 
    deleteMedia
};
