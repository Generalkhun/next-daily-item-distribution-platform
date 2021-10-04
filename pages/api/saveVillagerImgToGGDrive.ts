import fs from "fs";

import readline from "readline";
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import {
  SCOPES,
  TOKEN_PATH,
  TARGET_FOLDER_ID,
  SECRET_DIR,
} from "../../constants";

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function uploadFile(auth, file) {
  const drive = google.drive({ version: "v3", auth });
  const data = fs.createReadStream(file.path);

  const media = {
    body: data,
  };

  drive.files.create(
    {
      media,
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: [TARGET_FOLDER_ID],
      },
    },
    (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      }
    }
  );
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("uploading file...");
    const form = new formidable.IncomingForm();
    let credentials: Buffer;
    fs.readFile(`${SECRET_DIR}/credentials.json`, (err, data) => {
      console.log("credentials data", data);

      if (err) return console.log("Error loading client secret file:", err);
      // Authorize a client with credentials, then call the Google Drive API.
      credentials = data;
      console.log("credentials", credentials);
    
      //save file in ggdrive with auth
      form.parse(req, async function (err, fields, files) {
        const file = files.file;
        authorize(JSON.parse(credentials.toString()), (auth) =>
          uploadFile(auth, file)
        );
        res.status(200).json({ result:'upload success' });
      });
      
    });
    
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};