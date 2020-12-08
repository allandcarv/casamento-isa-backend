import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
// import dotenv from 'dotenv';

// dotenv.config();

interface IData {
  name: string;
  email: string;
  willGo: string;
  adults: number;
  children: number;
  message: string;
}

const enterData = async (data: IData): Promise<GoogleSpreadsheetRow> => {
  const spreadsheetId = process.env.SPREADSHEET_ID || '';
  const sheetId = process.env.SHEET_ID || '';
  const clientEmail = process.env.CLIENT_EMAIL || '';
  const privateKey = process.env.PRIVATE_KEY || '';

  const newRow = { ...data };

  const doc = new GoogleSpreadsheet(spreadsheetId);

  await doc.useServiceAccountAuth({
    client_email: clientEmail,
    private_key: privateKey.replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();

  const sheet = doc.sheetsById[sheetId];
  await sheet.addRow(newRow);

  return sheet.addRow(newRow);
};

export default enterData;
