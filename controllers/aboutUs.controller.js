// aboutUsController.js

import AboutUs from '../models/aboutUs.model.js';
import { v2 as cloudinary } from "cloudinary";


// Create operation
const createAboutUs = async (req, res) => {
    try {
        const { background, title, description, values, team } = req.body;

        const aboutUs = new AboutUs({
            background:req.files.background[0].path,
            title,
            description,
            values: values.map((value, index) => ({
                ...value,
                title: value.titles[index],
                description: value.descriptions[index],
                imageValue: req.files[value.imageValue][0].path // assuming you're using Multer or similar middleware to handle file uploads
            })),
            team: team.map((member, index) => ({
                ...member,
                title: member.titles[index],
                description: member.descriptions[index],
                imageTeam: req.files[member.imageTeam][0].path
            }))
        });

        await aboutUs.save();

        res.status(201).json(aboutUs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read operation
const getAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.find();
        res.status(200).json(aboutUs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update operation
const updateAboutUs = async (req, res) => {
    try {
        const { background, title, description, values, team } = req.body;

        const aboutUs = await AboutUs.findById(req.params.id);

        if (!aboutUs) {
            return res.status(404).json({ message: "About us not found" });
        }

        aboutUs.background = background ? req.files.background[0].path : aboutUs.background;
        aboutUs.title = title ? title : aboutUs.title;
        aboutUs.description = description ? description : aboutUs.description;

        if (values) {
            aboutUs.values = values.map((value, index) => ({
                ...value,
                title: value.titles[index],
                description: value.descriptions[index],
                imageValue: value.imageValue ? req.files[value.imageValue][0].path : aboutUs.values[index].imageValue // retrieve the file path for the uploaded file if present, otherwise use the existing file path
            }));
        }

        if (team) {
            aboutUs.team = team.map((member, index) => ({
                ...member,
                title: member.titles[index],
                description: member.descriptions[index],
                imageTeam: member.imageTeam ? req.files[member.imageTeam][0].path : aboutUs.team[index].imageTeam // retrieve the file path for the uploaded file if present, otherwise use the existing file path
            }));
        }

        const updatedAboutUs = await aboutUs.save();

        res.json(updatedAboutUs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete operation
const deleteAboutUs = async (req, res) => {
    const { id } = req.params;

    try {
        await AboutUs.findByIdAndRemove(id);
        res.status(200).json({ message: 'AboutUs deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default { createAboutUs, getAboutUs, updateAboutUs, deleteAboutUs };