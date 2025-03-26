import unzipper from 'unzipper';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import axios from 'axios';

const fileNamer = (val: string): `${string}.txt` => `${val}.txt`;
type temp_fileData = {
  name: string,
  value: ParsedData[],
}
interface ParsedData {
  [key: string]: string;
}

async function parseCSV(content: string): Promise<ParsedData[]> {
  return new Promise((resolve, reject) => {
    const results: ParsedData[] = [];
    const stream = Readable.from([content]);

    stream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const acl_consumerKey = (): string => {
  return process.env.ACL || '';
};

export class gtfsReader {
  directory: unzipper.CentralDirectory;
  constructor(directory: unzipper.CentralDirectory) {
    this.directory = directory;
  }
  static async init(url: string, date: string): Promise<gtfsReader | null> {
    try {
      const response = await axios.get(url, {params: {'acl:consumerKey': acl_consumerKey(), date: date}, responseType: 'arraybuffer'});
      
      const buffer = Buffer.from(response.data);
      const directory = await unzipper.Open.buffer(buffer);
      return new gtfsReader(directory);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  async get(fileNames: [string] | [string, string]): Promise<temp_fileData[]> {
    try {
      const files: temp_fileData[] = [];
      for (const fileName of fileNames) {
        const file = this.directory.files.find(file => file.path === fileNamer(fileName));
        if (file) {
          const content = await file.buffer();
          files.push({
            name: fileName,
            value: await parseCSV(content.toString()),
          });
        } else {
          files.push({ name: fileName, value: [] });
        }
      };
      return files;
    } catch (error) {
      console.log(error);
      return [];
    };
    
  }
}