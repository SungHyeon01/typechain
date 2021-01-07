import * as cryptoJS from "crypto-js";

class block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    cryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructrue = (aBlock: block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: block = new block(
  0,
  "2020020202002",
  "",
  "first block",
  12345678
);

let blockchain: block[] = [genesisBlock];

const getBlockchain = (): block[] => blockchain;
const getLatestBlock = (): block => blockchain[blockchain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const creatNewBlock = (data) => {
  const previousBlock: block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: block = new block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );

  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: block): string =>
  block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockValid = (candidateBlock: block, previousBlock: block): boolean => {
  if (!block.validateStructrue(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

creatNewBlock("second block");
creatNewBlock("third block");
creatNewBlock("forth block");

console.log(blockchain);
export {};
