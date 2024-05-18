const express = require('express');
const router = express.Router();
const FieldOfStudyModel = require('../models/FieldOfStudyModel');
const catchAsync = require('../utils/catchAsync');
const { validateFieldOfStudy } = require('../middleware/fieldOfStudy-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const fieldOfStudyModel = new FieldOfStudyModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const fieldsOfStudy = await fieldOfStudyModel.getAllFieldsOfStudy();
        res.json(fieldsOfStudy);
    }))
    .post(authenticate, authorize([3]), validateFieldOfStudy, catchAsync(async (req, res) => {
        const fieldOfStudyData = req.body;
        const fieldOfStudyId = await fieldOfStudyModel.addFieldOfStudy(fieldOfStudyData);
        res.status(201).json({ message: 'Obor byl vytvořen', fieldOfStudyId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const fieldOfStudyId = req.params.id;
        const fieldOfStudy = await fieldOfStudyModel.getFieldOfStudyById(fieldOfStudyId);
        if (fieldOfStudy) {
            res.json(fieldOfStudy);
        } else {
            res.status(404).json({ message: 'Obor nenalezen' });
        }
    }))
    .put(authenticate, authorize([3]), validateFieldOfStudy, catchAsync(async (req, res) => {
        const fieldOfStudyId = req.params.id;
        const newData = req.body;
        await fieldOfStudyModel.updateFieldOfStudy(fieldOfStudyId, newData);
        res.json({ message: 'Obor byl aktualizován' });
    }))
    .delete(authenticate, authorize([3]), catchAsync(async (req, res) => {
        const fieldOfStudyId = req.params.id;
        await fieldOfStudyModel.deleteFieldOfStudy(fieldOfStudyId);
        res.json({ message: 'Obor byl odstraněn' });
    }));

module.exports = router;
