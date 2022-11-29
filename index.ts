import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class BLockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    // return this.blocks;  <- 이렇게 하면 블록체인의 원본을 반환하기 때문에 아주 해킹당하고 다 조질 수 있음.
    return [...this.blocks]; // 이렇게 깊은복사해서 새로 만들어서 던져줘야 해킹 안당함
  }
}

const blockChain = new BLockChain();
blockChain.addBlock("First");
blockChain.addBlock("Second");
blockChain.addBlock("Third");
blockChain.addBlock("Fourth");

blockChain.getBlocks().push(new Block("xxxxx", 123123, "HACKEEEED"));
// 그냥 원본 블록체인을 리턴해주면 이걸로 아주 박살남

console.log(blockChain.getBlocks());
