import { parse } from 'csv-parse';
import fs from 'node:fs';

const pathToCsvTaks = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(pathToCsvTaks);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
});

async function importCsv() {
  const linesToParse = stream.pipe(csvParse);

  for await (const line of linesToParse) {
    const [title, description] = line;

    await fetch('http://localhost:3335/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }

}

importCsv()