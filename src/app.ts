import express from 'express';
import mongoose from 'mongoose';
import { Router } from './routes/core/router';
import { Kernel } from './middlewares/kernel';
import { environment } from './environment/dev';

// Mongoose Initialization 
mongoose.connect(environment.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Express Initialization
const app = express();

// Core Middlewares
Kernel.registerCoreMiddlewares(app);

// Routing
Router.registerRoutes(app);

app.listen(environment.port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log('Server is listening on ' + environment.port);
});