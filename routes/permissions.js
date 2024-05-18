const express = require('express');
const router = express.Router();
const PermissionModel = require('../models/PermissionModel');
const catchAsync = require('../utils/catchAsync');
const { validatePermission } = require('../middleware/permission-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const permissionModel = new PermissionModel(pool);

router
    .route('/')
    .get(authenticate, authorize([3]), catchAsync(async (req, res) => { // pouze admin
        const permissions = await permissionModel.getAllPermissions();
        res.json(permissions);
    }))
    .post(authenticate, authorize([3]), validatePermission, catchAsync(async (req, res) => { // pouze admin
        const permissionData = req.body;
        const permissionId = await permissionModel.addPermission(permissionData);
        res.status(201).json({ message: 'Oprávnění bylo vytvořeno', permissionId });
    }));

router
    .route('/:id')
    .get(authenticate, authorize([3]), catchAsync(async (req, res) => { // pouze admin
        const permissionId = req.params.id;
        const permission = await permissionModel.getPermissionById(permissionId);
        if (permission) {
            res.json(permission);
        } else {
            res.status(404).json({ message: 'Oprávnění nenalezeno' });
        }
    }))
    .put(authenticate, authorize([3]), validatePermission, catchAsync(async (req, res) => { // pouze admin
        const permissionId = req.params.id;
        const newData = req.body;
        await permissionModel.updatePermission(permissionId, newData);
        res.json({ message: 'Oprávnění bylo aktualizováno' });
    }))
    .delete(authenticate, authorize([3]), catchAsync(async (req, res) => { // pouze admin
        const permissionId = req.params.id;
        await permissionModel.deletePermission(permissionId);
        res.json({ message: 'Oprávnění bylo odstraněno' });
    }));

module.exports = router;
