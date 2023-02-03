const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Service = require('../../models/Service');


// @route   GET api/service/test
// @desc    Tests service route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Service Works' }));

// @route   GET api/service/all
// @desc    Get all services 
// @access  Public
router.get('/all', async (req, res) => {
    try {
        const services = await Service.find()

        if (services.length == 0) {
            return res.status(400).json({ msg: 'No Services Available' });
        }

        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/service/add
// @desc     Add Service
// @access   Public
router.post(
    '/add',
    check('serviceId', 'Service Id is required').notEmpty(),
    check('serviceCategory', 'ServiceCategory is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const serviceBody = req.body;
        const id = serviceBody.serviceId;

        try {
            let service = await Service.findOne({ serviceId: id });

            if (service) {
                return res.status(400).json({ msg: 'Service with same Id already exists!' });
            }

            service = new Service({
                ...serviceBody
            });

            await service.save();
            res.json({ msg: 'Service Added Successfully!' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
