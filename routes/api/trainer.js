const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const TrainerProfile = require('../../models/TrainerProfile');


// @route   GET api/trainers/test
// @desc    Tests trainers route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'TrainerProfile Works' }));

// @route   GET api/trainers/all
// @desc    Get all trainers 
// @access  Public
router.get('/all', async (req, res) => {
    try {
        const trainers = await TrainerProfile.find()

        if (trainers.length == 0) {
            return res.status(400).json({ msg: 'No Trainers Available' });
        }

        res.json(trainers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/trainers/add
// @desc     Add trainers
// @access   Public
router.post(
    '/add',
    // check('serviceId', 'Service Id is required').notEmpty(),
    // check('serviceCategory', 'ServiceCategory is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        const id = body.trainerId;

        try {
            let trainer = await TrainerProfile.findOne({ trainerId: id });

            if (trainer) {
                return res.status(400).json({ msg: 'Service with same Id already exists!' });
            }

            trainer = new TrainerProfile({
                ...body
            });

            await trainer.save();
            res.json({ msg: 'Trainer Added Successfully!' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    POST api/trainers/add
// @desc     Update trainer Details
// @access   Public
router.put(
    '/update',
    // check('serviceId', 'Service Id is required').notEmpty(),
    // check('serviceCategory', 'ServiceCategory is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        const id = body.trainerId;

        try {
            let trainer = await TrainerProfile.findOne({ trainerId: id });

            if (!trainer) {
                return res.status(400).json({ msg: "Trainer doesn't exists!" });
            }

            // trainer = new TrainerProfile({
            //     ...body
            // });

            await trainer.updateOne({ trainerId: id });
            res.json({ msg: 'Trainer Updated Successfully!' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
