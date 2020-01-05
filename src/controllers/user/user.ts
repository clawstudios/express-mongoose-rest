
import { Request, Response } from 'express';
import { Schema } from 'mongoose';
import { User } from '../../schemas/user';

export const UserController = {
    get: (req: Request, res: Response) => {
        User.find((err, users) => {
            if (err) {
                res.status(500).json({ code: 500, message: err });
            } else {
                res.json(users);
            }
        });
    },
    
    // - GET - /users/:id # Get specific user
    getUser: (req: Request, res: Response) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(500).json({ code: 500, message: err });
            } else {
                res.json(user);
            }
        });
    },
        
    // - CREATE - /users # Create a new user
    create: (req: Request, res: Response) => {
        let user = new User(req.body);
    
        user.save((err) => {
            if (err) {
                res.status(500).json({ code: 500, message: err });
            } else {
                res.json(user);
            }
        });
    
    },
        
    // - UPDATE - /users # Update a user
    update: (req: Request, res: Response) => {
        User.findOneAndUpdate({ _id: req.body.id }, req.body, (err, user) => {
            if (err) {
                res.status(500).json({ code: 500, message: err });
            } else {
                res.json(true);
            }
        });
    },

    // - DELETE - /users/:id # Delete a user
    delete: (req: Request, res: Response) => {
    
        User.deleteOne({ _id: req.params.id }, (err) => {
            if (err) {
                res.status(500).json({ code: 500, message: err });
            } else {
                res.json(true);
            }
        });
    
    },
};