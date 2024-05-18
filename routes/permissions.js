const express = require('express');
const router = express.Router();
const PermissionModel = require('../models/PermissionModel');
const catchAsync = require('../utils/catchAsync');

const pool = require('../app.js');
const permissionModel = new PermissionModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const permissions = await permissionModel.getAllPermissions();
        res.json(permissions);
    }))
    .post(catchAsync(async (req, res) => {
        const permissionData = req.body;
        const permissionId = await permissionModel.addPermission(permissionData);
        res.status(201).json({ message: 'Oprávnění bylo vytvořeno', permissionId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const permissionId = req.params.id;
        const permission = await permissionModel.getPermissionById(permissionId);
        if (permission) {
            res.json(permission);
        } else {
            res.status(404).json({ message: 'Oprávnění nenalezeno' });
        }
    }))
    .put(catchAsync(async (req, res) => {
        const permissionId = req.params.id;
        const newData = req.body;
        await permissionModel.updatePermission(permissionId, newData);
        res.json({ message: 'Oprávnění bylo aktualizováno' });
    }))
    .delete(catchAsync(async (req, res) => {
        const permissionId = req.params.id;
        await permissionModel.deletePermission(permissionId);
        res.json({ message: 'Oprávnění bylo odstraněno' });
    }));

module.exports = router;
