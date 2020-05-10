[![Claw Studios](https://pbs.twimg.com/profile_images/1081702613823967233/SeXAgWwO_200x200.jpg)](https://www.clawstudios.com/)

# Node + Express + Mongoose REST API Boilerplate
The intention of this project is to provide a Simple Solid Scalable base of code to create RESTful APIs using Node.js + Express.js and MongoDB (Mongoose ODM).
It provides a User profile CRUD as an example.

## Dependencies
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

# Requirements
You need to have installed [Node.js](https://nodejs.org/es/download/).


# Set up
Clone the repo or download it. 

Go to the project folder and run 

```sh
$ npm install
```
And run your server running the following command in the root of the project:

```sh
$ npm start
```

# Configuration
Configure the **mongoDB** connection and express **listen port** in the `/src/environment/dev.ts` file by changing the object values.

```ts
export const environment = {
    port: 8080, // Your wanted listen port here
    mongoURL: 'mongodb://localhost/test' // Your mongoDB url goes here.
};
```

# Architecture 
The concepts we are trying to include in this architecture are the following:
- Routes
- Middlewares
- Controllers
- Schemas (Models)

## Routes
To isolate routes addition in the app.ts file, we created a basic **ROUTER** located in the `/src/routes/core/router.ts` file in where we add the array of routes exported in the files located in the `/src/routes/` folder. 
*If you want, go check it out and suggest more functionalities or better ways to implement it*

To create a new group of routes, copy the `/src/routes/user.ts` file, you will see that you need to export an array of routes.

Each route is an object formed with the following properties:
- **url:** A string with the route path.
- **middlewares:** An array of IMiddleware Classes.
- **method:** An *HTTP_METHODT* enum value for the request method.
- **controller:** A Function provided by a Controller Object.

```ts
export const ROUTES:Array<any>  = [
    {
        url: '/users',
        middlewares: [],
        method: HTTP_METHODS.GET,
        controller: UserController.get
    },
];
```

To add correctly the new group of routes, you need to import the routes in the `/src/routes/core/router.ts` file

```ts
static ROUTES:Array<Array<Route>> = [
    USER_ROUTES
];
```


## Middlewares
Used to handle the request before executing the controller. Often used to prevent or grant access to certain method of the API.
You can intercept request for a certain route or for all the incoming requests.

### Creating a Route Middleware
To create a middleware you only need to create a new class in the middlewares folder and implement the *Middleware Abstract Class* from the `/src/middlewares/middleware.ts` file, and override the **canActivate()** method.

```ts
import { Middleware } from './middleware';

export class AuthMiddleware implements Middleware {

    public static canActivate(req, res, next) {        
        // DO YOUR CHECKS HERE

        // Finish execution calling next()
        next();
    }
}
```

***NOTE:*** *Please read more abou [Express.js Middlewares](https://expressjs.com/en/guide/writing-middleware.html) and about [express.json()](http://expressjs.com/en/4x/api.html#express.json) for more information on writting middlewares.


### Adding Server Middlewares
When you want to intercept all the incoming requests you have to add a Server Middleware to ***coreMiddlewares*** array in the `/src/middlewares/kernel.ts` file.

```ts
import express, { Express } from 'express';
import cors from 'cors';

// Middlewares added to Express App should go here.
export const coreMiddlewares = [
    cors(),
    express.json(),
    // ADD YOUR SERVER MIDDLEWARE HERE
];
...
```

## Controllers
We represented them as objects that contain methods registered in routes. 
- *This need to be changed, but for now it works.*

### Creating a Controller
Create a new file in the `/src/controllers/` folder, then export a const object with the name of the controller, and add the functions that a certain route will execute.

```ts
import { Request, Response } from 'express';
...
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
    ...
};
```
*NOTE: check the UserController example for better understanding.*


## Schemas: Models
Models are based in [mongoose Schema](https://mongoosejs.com/docs/guide.html), please go and read about this.

### Creating a Model
First create an Interface with the raw data structure for your model, in the `/src/interfaces/` folder.

```ts
export interface IUser {
    name: String;
    lastName: String;
    email: String;
    birthDate: Date;
}
```

Create a new file in the `/src/schemas/` folder and export a new Interface that extends from the Interface that you created and the Document Interface from mongoose.

```ts
import { Document, Schema, Model, model} from 'mongoose';
import { IUser } from '../interfaces/iuser';

export interface IUserModel extends IUser, Document {
    // You can add methods to your model here.
    // See fullName() example in /src/schemas/user
}
```

Next step is to create the Schema. [Read more about this here](https://mongoosejs.com/docs/guide.html#definition)

```ts
export var UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: Date, required: true }
}, { timestamps: true });
```

And Export the model like this:

```ts
export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
```


# Contribution
We encourage you to let us know about your suggestions, ideas, corrections, and more. Use Github platform, create issues, fork the repo and send PR or just send us an email to : [info@clawstudios.com](mailto:info@clawstudios.com).


[www.clawstudios.com](https://www.clawstudios.com/)


