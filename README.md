# Instagram Follower Count Scraper

This is a node application to get the follower counts of a list of instagram handles.

To install:
```console
npm install
npx tsc --init
```

First put the instagram handles in an input file with each handle on a new line:
```text
cristiano
leomessi
```

To run:
```console
npx ts-node ig.ts <input-file>
```

For example, you may get:
```shell-session
foo@bar:~$ npx ts-node ig.ts ig-input.txt
642,000,000
505,000,000

```

To pipe output to a file, you can run:
```console
npx ts-node ig.ts <input-file> 2>&1 | tee <output-file>
```
