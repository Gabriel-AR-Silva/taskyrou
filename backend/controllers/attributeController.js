const AttributeModel = require('../models/Attribute');
const mongoose = require('mongoose');

exports.getAllAttributes = async (req, res) => {
    try {
        const attributes = await AttributeModel.find();
        res.status(200).send(attributes);
    } catch (error) {
        console.log(`Error fetching all attributes: ${error}`);
        res.status(500).send({ message: 'Failed to fetch all attributes', error: error.message });
    }
};

exports.createAttribute = async (req, res) => {
    try {        
        const data = req.body;
        const newAttribute = new AttributeModel(data);
        await newAttribute.save();
        
        if(!newAttribute._id) {
            return res.status(500).send({ message: 'Failed to create attribute' });
        }

        res.status(201).send({ attribute: newAttribute, message: 'Attribute was created successfully' });
    } catch (error) {
        console.log(`Error creating attribute: ${error.message}`);
        res.status(500).send({ message: 'Error creating attribute', error: error.message });
    }
};

exports.updateAttribute = async (req, res) => {
    try {
        const attributeId = req.params.id;
        const data = req.body;

        if(!mongoose.Types.ObjectId.isValid(attributeId)) {
            res.status(404).send({ message: 'Attribute ID is not valid' });
        }

        const updatedAttribute = await AttributeModel.findByIdAndUpdate(attributeId, data, { new: true, runValidators: true});

        if (!updatedAttribute) {
            return res.status(404).send({ message: 'Unable to update attribute' });
        }

        res.status(200).send({ message: 'Success to update attribute', data: updatedAttribute });
    } catch (error) {
        console.log(`Error to update attribute: ${error.message}`);
        res.status(500).send({ message: 'Error to update', error: error.message });
    }
};

exports.deleteAttribute = async (req, res) => {
    try {
        const attributeId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(attributeId)) {
            res.status(404).send({ message: 'Attribute ID is not valid' });
        }

        const deletedAttribute = await AttributeModel.findByIdAndDelete(attributeId);

        if(!deletedAttribute) {
            return res.status(404).send({ message: 'Attribute not found' });
        }
        
        res.status(200).send({ message: 'Attribute was deleted successfully' });
    } catch (error) {
        console.log(`Error deleting attribute: ${error.message}`);
        res.status(500).send({ message: 'Error deleting attribute', error: error.message });
    }
};

exports.addExperiencePointsToAttribute = async (req, res) => {
    try {        
        const attributeId = req.params.id;
        const { xp } = req.body;

        if (!mongoose.Types.ObjectId.isValid(attributeId)) {
            return res.status(400).send({ message: 'Attribute ID is not valid' });
        }

        const attribute = await AttributeModel.findById(attributeId);

        const totalXp = attribute.progress_xp + xp;

        let updates = {};

        if (attribute.progress_max >= totalXp) {
            attribute.level += 1;
            attribute.progress_max += 500.

            updates.progress_xp = attribute.progress_max - totalXp;
            updates.progress_max = attribute.progress_max
            updates.level = attribute.level
        }

        updates.progress_xp = totalXp

        const updatedAttribute = await AttributeModel.findByIdAndUpdate(
            attributeId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedAttribute) {
            return res.status(404).send({ message: 'Attribute not found' });
        }

        res.status(200).send(updatedAttribute);
    } catch (error) {
        console.error(`Error updating attribute: ${error.message}`);
        res.status(500).send({ message: 'Error updating attribute', error: error.message });
    }
};