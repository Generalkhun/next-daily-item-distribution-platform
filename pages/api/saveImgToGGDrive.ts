import fs from "fs";

import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import {
  DRIVE_API_TARGET_FOLDER_ID,
  GOOGLE_DRIVE_AUTH_CONFIG,
} from "../../constants";
import { get } from "lodash";

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