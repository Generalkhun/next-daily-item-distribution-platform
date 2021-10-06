import fs from "fs";

import readline from "readline";
import { drive_v3, google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import {
  DRIVE_API_SCOPES,
  DRIVE_API_TOKEN_PATH,
  DRIVE_API_TARGET_FOLDER_ID,
  DRIVE_API_SECRET_DIR,
  GOOGLE_DRIVE_AUTH_CONFIG,
} from "../../constants";
import { get } from "lodash";

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
// function authorize(credentials: any, callback: any) {
//   const { client_secret, client_id, redirect_uris } = credentials.web;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris[0]
//   );

//   // Check if we have previously stored a token.
//   fs.readFile(DRIVE_API_TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token.toString()));
//     callback(oAuth2Client);
//   });
// }

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
// function getAccessToken(oAuth2Client: any, callback: any) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: DRIVE_API_SCOPES,
//   });
//   console.log("Authorize this app by visiting this url:", authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question("Enter the code from that page here: ", (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err: any, token: any) => {
//       if (err) return console.error("Error retrieving access token", err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(DRIVE_API_TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log("Token stored to", DRIVE_API_TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

const uploadFile = async (file: any) => {
  const authServiceAccount = await google.auth.getClient(GOOGLE_DRIVE_AUTH_CONFIG)
  const drive = google.drive({ version: "v3", auth: authServiceAccount });
  const data = fs.createReadStream(file.path);
  const media = {
    body: data,
  };

  try {
    const savedFile = await drive.files.create(
      {
        media,
        requestBody: {
          name: file.name,
          mimeType: file.type,
          parents: [DRIVE_API_TARGET_FOLDER_ID],
        },
      }
    )
    return savedFile

  } catch (error: any) {
    throw new Error(error)
  }

}

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("uploading file...");
    const form = new formidable.IncomingForm();
    //let credentials: Buffer;
    // fs.readFile(`${DRIVE_API_SECRET_DIR}/credentials.json`, (err, data) => {
    //   console.log("credentials data", data);

    //   if (err) return console.log("Error loading client secret file:", err);
    //   // Authorize a client with credentials, then call the Google Drive API.
    //   credentials = data;
    //   console.log("JSON.parse(credentials.toString())", JSON.parse(credentials.toString()));

    //   //save file in ggdrive with auth
    //   form.parse(req, async function (err, fields, files) {
    //     const file = files.file;
    //     // authorize(JSON.parse(credentials.toString()), (auth: any) =>
    //     //   uploadFile(auth, file)
    //     // );
    //     await uploadFile(file) // upload file to google drive
    //     res.status(200).json({ result: 'upload success' });
    //   });

    // });
    //save file in ggdrive with auth
    form.parse(req, async function (err, fields, files) {
      const file = files.file;
      const savedFile = await uploadFile(file) // upload file to google drive
      console.log('savedFile', savedFile);
      res.status(200).json({ imgIdGGdrive: get(savedFile, 'data.id') });
    });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};