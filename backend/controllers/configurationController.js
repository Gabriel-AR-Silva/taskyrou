const ConfigurationModel = require('../models/Configuration');

exports.getConfiguration = async (req, res) => {
    try {
        const configuration = await ConfigurationModel.findOne();

        if (!configuration) {
            return res.status(404).send({ message: 'Configuration not found' });
        }

        res.status(200).send(configuration);
    } catch (error) {
        console.error(`Error fetching configuration: ${error}`);
        res.status(500).send({ message: 'Failed to fetch configuration', error: error.message });
    }
};

exports.updateConfiguration = async (req, res) => {
    try {
        const data = req.body;
        const updatedConfiguration = await ConfigurationModel.findOneAndUpdate({}, data, { new: true, runValidators: true});

        if (!updatedConfiguration) {
            return res.status(404).send({ message: 'Unable to update configuration' });
        }

        res.status(200).send({ message: 'Success to update configuration', data: updatedConfiguration });
    } catch (error) {
        console.log(`Error to update configuration: ${error.message}`);
        res.status(500).send({ message: 'Error to update', error: error.message });
    }
};