const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Appointment = require('../../models/Appointment');
const generateId = require('../../utils/uuidGenerator');


// @route   GET api/appointment/test
// @desc    Tests appointment route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Appointment api works' }));

// @route   GET api/appointment/all
// @desc    Get all appointments 
// @access  Public
router.get('/all', async (req, res) => {
    try {
        const appointments = await Appointment.find()

        if (appointments.length == 0) {
            return res.status(400).json({ msg: 'No appointments available' });
        }

        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error : ' + err.message);
    }
});

// @route    POST api/appointment/create
// @desc     Create appointment
// @access   Public
router.post(
    '/create',
    check('name', 'Name is required').notEmpty(),
    check('phoneNo', 'Phone no. is required').notEmpty(),
    // check('appointmentDate', 'appointmentDate is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const appointmentBody = req.body;
        const appointmentId = generateId();

        // TODO:// Future
        // Check if there is duplicate appoints using phone and email
        try {
            // let appointment = await Appointment.findOne({ appointmentId: id });

            // if (appointment) {
            //     return res.status(400).json({ msg: 'Appointment with same Id already exists!' });
            // }

            appointment = new Appointment({
                ...appointmentBody,
                appointmentId: appointmentId
            });

            await appointment.save();
            res.json({ msg: 'Appointment created successfully!', appointment: appointment });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error : ' + err.message);
        }
    }
);

module.exports = router;
