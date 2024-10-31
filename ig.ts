import axios from 'axios';
import fs from 'fs';

function formatNum(num: string) {
  num = String(num);
  num = num.split(',').join('');
  num = num.replace('M', '*1000000');
  num = num.replace('K', '*1000');

  num = eval(num);
  return num.toLocaleString();
}

const REGEX = /content="(.+) Followers/;

async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('Expected 1 argument. ts-node ig.ts <input-file>');
    return;
  }

  const inputFile = args[0];
  try {
    const data = fs.readFileSync(inputFile, 'utf-8');
    const usernames = data.split('\n');

    for (const username of usernames) {
      if (!username) {
        console.log('');
      } else {
        const igCount = await getIgFollowers(username);
        console.log(igCount);
      }
    }
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

async function getIgFollowers(username: string): Promise<string> {
  return axios
    .get(`https://www.instagram.com/${username}`)
    .then((response) => {
      let data: string = response.data;
      const index = data.indexOf('Followers');
      data = data.slice(index - 40, index + 10);

      const matches = data.match(REGEX);
      if (matches && matches.length >= 1) {
        return formatNum(matches[1]);
      } else {
        return '';
      }
    })
    .catch(() => {
      return 'Error: something went wrong';
    });
}

main();
