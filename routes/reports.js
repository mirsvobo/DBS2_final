const express = require('express');
const router = express.Router();
const ReportModel = require('../models/ReportModel');
const catchAsync = require('../utils/catchAsync');
const { validateReport } = require('../middleware/report-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const reportModel = new ReportModel(pool);

router
    .route('/')
    .get(authenticate, authorize([3]), catchAsync(async (req, res) => { // pouze admin
        const reports = await reportModel.getAllReports();
        res.json(reports);
    }))
    .post(authenticate, authorize([2, 3]), validateReport, catchAsync(async (req, res) => {
        const reportData = req.body;
        const reportId = await reportModel.addReport(reportData);
        res.status(201).json({ message: 'Hlášení bylo vytvořeno', reportId });
    }));

router
    .route('/:id')
    .get(authenticate, authorize([3]), catchAsync(async (req, res) => { // pouze admin
        const reportId = req.params.id;
        const report = await reportModel.getReportById(reportId);
        if (report) {
            res.json(report);
        } else {
            res.status(404).json({ message: 'Hlášení nenalezeno' });
        }
    }))
    .delete(authenticate, authorize([3]), catchAsync(async (req, res) => { // pouze admin
        const reportId = req.params.id;
        await reportModel.deleteReport(reportId);
        res.json({ message: 'Hlášení bylo odstraněno' });
    }));

module.exports = router;
