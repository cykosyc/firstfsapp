import * as express from 'express';
import Cars from '../models/car';

let router = express.Router();

router.get('/', (req, res) => {
  Cars.find().then((foundCars) => {
    res.status(200).json(foundCars);
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.get('/:id', (req, res) => {
  let carId = req.params['id'];
  Cars.findOne({_id: carId}).then((foundCar) => {
    res.status(200).json(foundCar);
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.put('/:id', (req, res, next) => {
  let carId = req.params['id'];

  Cars.findOne({_id: carId}).then((foundCar) => {
    if (foundCar) {
        foundCar.make     = req.body.make;
        foundCar.carModel = req.body.carModel;
        foundCar.year     = req.body.year;

      foundCar.save().then((updatedCar) => {
        res.status(200).json(updatedCar);
      }).catch((err) => {
        res.status(404).json(err);
      });
    } else {
      res.status(500).json(foundCar);
    }
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.post('/', (req, res) => {
  let car = new Cars();

  car.make     = req.body.make;
  car.carModel = req.body.carModel;
  car.year     = req.body.year;

  car.save().then((newCar) => {
    res.status(200).json(newCar)
  }).catch((err) => {
    res.status(400).json(err)
  });
});

router.delete('/:id', (req, res) => {
  let carId = req.params['id'];

  Cars.remove({_id: carId}).then((deletedCar) => {
    res.status(200).json(deletedCar);
  }).catch((err) => {
    res.status(404).json(err);
  });
});

export default router;
