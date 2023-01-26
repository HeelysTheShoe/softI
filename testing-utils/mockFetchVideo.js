import fs from 'fs';
import path from 'path';
const __dirname = path.dirname(__filename);




export const mockFetchVideo = async () => {
  let video = await fs.promises.readFile(path.resolve(__dirname, '../uploads/c83e23fc71e00de195b688dbb56a0849'))
  return video;
}


