import { NextFunction, Request, Response } from 'express';

import { User } from '../db/User';
import { User as usertype } from '../@types/user';

exports.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;

    const usersArr = await User.find({ userName: userName });

    if (usersArr.length === 0) {
      throw { status: 404, message: 'user not exist' };
    }

    for (let user of usersArr) {
      if (user.password === password) {
        return res
          .send({ userName: user.userName, admin: user.isAdmin })
          .status(200);
      }
    }

    throw { status: 401, message: 'password incorrect' };
  } catch (error) {
    next(error);
  }
};
