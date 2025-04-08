import contactModel from "../model/contactModel.js";
import PortifolioContactModel from "../model/PortifolioContactModel.js";
import asyncWrapper from "../middleware/async.js";
import {UnauthorizedError,BadRequestError} from "../error/index.js";
import { validationResult } from "express-validator";


export const addNewContact = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    };
    const newContact = await contactModel.create(req.body)
    return res.status(201).json({message:"Message received successfully",Contact:newContact});
});
export const AddNewPortifolioContact=asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    };
    const newContact = new PortifolioContactModel(
        {
            name:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
            message1:req.body.message1,
            phone:req.body.phone
        })
    const savedContact=await newContact.save();
    return res.status(201).json({message:"Message received successfully",Contact:savedContact});
});
export const ListContact = asyncWrapper(async (req, res, next) => {
        const foundContact = await contactModel.find();
        return res.status(200).json({foundContact});
        next(); 
});

export const findbyUser= asyncWrapper(async (req, res, next) => {
        const foundContact = await contactModel.findById(req.params.id);
        if(!foundContact)
            {
                res.status(404).json(`Message not found`)
            }
        return res.status(200).json({foundContact});
        next();
});


export const updateContact = asyncWrapper(async (req, res, next) => {
    const Contactowner = req.params.id;
        const foundContact = await contactModel.findbyIdAndUpdate(Contactowner,req.body,{new:true});
        if(!foundContact)
            {
                res.status(404).json(`Message not found`)
            }
        return res.status(200).json({foundContact});
        next();
});

export const deleteContact = asyncWrapper(async (req, res, next) => {
    const Contactowner = req.params.id;
        const foundContact = await contactModel.findByIdAndDelete(Contactowner);
        return res.status(200).json({foundContact});
        next();
});



