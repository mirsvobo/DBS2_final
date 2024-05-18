const express = require('express');
const router = express.Router();
const DormitoryModel = require('../models/DormitoryModel');
const catchAsync = require('../utils/catchAsync');
const { validateDormitory } = require('../middleware/dormitory-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const dormitoryModel = new DormitoryModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const dormitories = await dormitoryModel.getAllDormitories();
        res.json(dormitories);
    }))
    .post(authenticate, authorize([3]), validateDormitory, catchAsync(async (req, res) => {
        const dormitoryData = req.body;
        const dormitoryId = await dormitoryModel.addDormitory(dormitoryData);
        res.status(201).json({ message: 'Kolej byla vytvořena', dormitoryId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const dormitoryId = req.params.id;
        const dormitory = await dormitoryModel.getDormitoryById(dormitoryId);
        if (dormitory) {
            res.json(dormitory);
        } else {
            res.status(404).json({ message: 'Kolej nenalezena' });
        }
    }))
    .put(authenticate, authorize([3]), validateDormitory, catchAsync(async (req, res) => {
        const dormitoryId = req.params.id;
        const newData = req.body;
        await dormitoryModel.updateDormitory(dormitoryId, newData);
        res.json({ message: 'Kolej byla aktualizována' });
    }))
    .delete(authenticate, authorize([3]), catchAsync(async (req, res) => {
        const dormitoryId = req.params.id;
        await dormitoryModel.deleteDormitory(dormitoryId);
        res.json({ message: 'Kolej byla odstraněna' });
    }));

module.exports = router;
