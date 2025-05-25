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

        console.log(data);
        

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