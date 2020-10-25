import { Request, Response } from 'express';
import * as Yup from 'yup';

import enterData from '../providers/google_sheets';
import sendmail from '../providers/nodemailer';

class ConfirmationController {
  public async create(request: Request, response: Response): Promise<any> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      willGo: Yup.string().required(),
      adults: Yup.number().min(0).required(),
      children: Yup.number().min(0).required(),
      message: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Field validation failed.' });
    }

    try {
      await enterData(request.body);
    } catch (e) {
      return response.status(500).json({ error: 'Error entering data.' });
    }

    try {
      await sendmail(request.body.name, request.body.email);
    } catch (e) {
      console.error(e);
    }

    return response.status(201).send();
  }
}

export default new ConfirmationController();
