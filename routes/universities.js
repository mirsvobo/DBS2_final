const express = require('express');
const router = express.Router();
const UniversityModel = require('../models/UniversityModel');
const catchAsync = require('../utils/catchAsync');
const { validateUniversity } = require('../middleware/university-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const universityModel = new UniversityModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const universities = await universityModel.getAllUniversities();
        res.json(universities);
    }))
    .post(authenticate, authorize([3]), validateUniversity, catchAsync(async (req, res) => { // pouze admin
        const universityData = req.body;
        const universityId = await universityModel.addUniversity(universityData);
        res.status(201).json({ message: 'Univerzita byla vytvořena', universityId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const universityId = req.params.id;
        const university = await universityModel.getUniversityById(universityId);
        if (university) {
            res.json(university);
        } else {
            res.status(404).json({ message: 'Univerzita nenalezena' });
        }
    }))
    .put(authenticate, authorize([3]), validateUniversity, catchAsync(async (req, res) => { // pouze admin
        const universityId = req.params.id;
        const newData = req.body;
        await universityModel.updateUniversity(universityId, newData);
        res.json({ message: 'Univerzita byla aktualizována' });
    }))
    .delete(authenticate, authorize([3]), catchAsync(async (req, res) => { // pouze admin
        const universityId = req.params.id;
        await universityModel.deleteUniversity(universityId);
        res.json({ message: 'Univerzita byla odstraněna' });
    }));

module.exports = router;
