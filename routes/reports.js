const express = require('express');
const router = express.Router();
const ReportModel = require('../models/ReportModel');
const catchAsync = require('../utils/catchAsync');

const pool = require('../app.js');
const reportModel = new ReportModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const reports = await reportModel.getAllReports();
        res.json(reports);
    }))
    .post(catchAsync(async (req, res) => {
        const reportData = req.body;
        const reportId = await reportModel.addReport(reportData);
        res.status(201).json({ message: 'Hlášení bylo vytvořeno', reportId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const reportId = req.params.id;
        const report = await reportModel.getReportById(reportId);
        if (report) {
            res.json(report);
        } else {
            res.status(404).json({ message: 'Hlášení nenalezeno' });
        }
    }))
    .put(catchAsync(async (req, res) => {
        const reportId = req.params.id;
        const newData = req.body;
        await reportModel.updateReport(reportId, newData);
        res.json({ message: 'Hlášení bylo aktualizováno' });
    }))
    .delete(catchAsync(async (req, res) => {
        const reportId = req.params.id;
        await reportModel.deleteReport(reportId);
        res.json({ message: 'Hlášení bylo odstraněno' });
    }));

module.exports = router;
