const ListModel = require('../models/List');

exports.getAllLists = async (req, res) => {
    try {
        const lists = await ListModel.find();
        res.status(200).send(lists);
    } catch (error) {
        console.log(`Error fetching all lists: ${error}`);
        res.status(500).send({ message: 'Failed to fetch all lists', error: error.message });
    }
};

exports.createList = async (req, res) => {
    try {        
        const data = req.body;
    
        const newList = new ListModel(data);
        await newList.save();

        if(!newList._id) {
            return res.status(500).send({ message: 'Failed to create list' });
        }

        res.status(201).send({ list: newList, message: 'List was created successfully' });
    } catch (error) {
        console.log(`Error creating list: ${error.message}`);
        res.status(500).send({ message: 'Error creating list', error: error.message });
    }
};