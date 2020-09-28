import { Request, Response } from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as Yup from 'yup';

import dotenv from 'dotenv';

dotenv.config();

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

    const { name, email, willGo, adults, children, message } = request.body;

    const spreadsheetId = process.env.SPREADSHEET_ID || '';
    const sheetId = process.env.SHEET_ID || '';
    const clientEmail = process.env.CLIENT_EMAIL || '';
    const privateKey = process.env.PRIVATE_KEY || '';

    const newRow = { name, email, willGo, adults, children, message };

    const doc = new GoogleSpreadsheet(spreadsheetId);

    try {
      await doc.useServiceAccountAuth({
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      });

      await doc.loadInfo();

      const sheet = doc.sheetsById[sheetId];
      await sheet.addRow(newRow);

      return response.status(201).send();
    } catch (e) {
      return response.status(500).json({ error: e });
    }
  }
}

export default new ConfirmationController();
