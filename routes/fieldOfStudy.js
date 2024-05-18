const express = require('express');
const router = express.Router();
const FieldOfStudyModel = require('../models/FieldOfStudyModel');
const catchAsync = require('../utils/catchAsync');

const pool = require('../app');
const fieldOfStudyModel = new FieldOfStudyModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const fields = await fieldOfStudyModel.getAllFieldsOfStudy();
        res.json(fields);
    }))
    .post(catchAsync(async (req, res) => {
        const fieldData = req.body;
        const fieldId = await fieldOfStudyModel.addFieldOfStudy(fieldData);
        res.status(201).json({ message: 'Obor byl vytvořen', fieldId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const fieldId = req.params.id;
        const field = await fieldOfStudyModel.getFieldOfStudyById(fieldId);
        if (field) {
            res.json(field);
        } else {
            res.status(404).json({ message: 'Obor nenalezen' });
        }
    }))
    .put(catchAsync(async (req, res) => {
        const fieldId = req.params.id;
        const newData = req.body;
        await fieldOfStudyModel.updateFieldOfStudy(fieldId, newData);
        res.json({ message: 'Obor byl aktualizován' });
    }))
    .delete(catchAsync(async (req, res) => {
        const fieldId = req.params.id;
        await fieldOfStudyModel.deleteFieldOfStudy(fieldId);
        res.json({ message: 'Obor byl odstraněn' });
    }));

module.exports = router;
