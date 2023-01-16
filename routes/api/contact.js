const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Contact = require('../../models/Contact');
const generateId = require('../../utils/uuidGenerator');


// @route   GET api/contact/test
// @desc    Tests contact route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Contact api works' }));

// @route    GET api/contact/all
// @desc     Get all Contacts
// @access   Public
router.get('/all', async (req, res) => {
    try {
        const contact = await Contact.find();

        if (contact.length == 0) {
            return res.status(400).json({ msg: 'No contacts available' });
        }

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error : ' + err.message);
    }
});

// @route    POST api/contact/create
// @desc     Create Contact
// @access   Public
router.post(
    '/create',
    check('name', 'Name is required').notEmpty(),
    check('phoneNo', 'Phone No. is required').notEmpty(),
    // check('email', 'Please include a valid email').isEmail(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        const phoneNo = body.phoneNo;
        const id = generateId();

        try {
            let contact = await Contact.findOne({ phoneNo: phoneNo });

            if (contact) {
                console.log('Update...')
                contact.modified = Date.now;
                await contact.updateOne({ phoneNo: phoneNo });
                res.json({ msg: 'Thank you! Our team will contact you shortly.' });
            } else {
                contact = new Contact({
                    ...body,
                    contactId: id
                });
                await contact.save();
                res.json({ msg: 'Thank you! Our team will contact you shortly.' });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error : ' + err.message);
        }
    }
);

module.exports = router;