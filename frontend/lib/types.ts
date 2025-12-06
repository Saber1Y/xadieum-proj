export type StorageInfo = {
  used: number;
  capacity: number;
};

export type GossipInfo = {
  lastSeen: number; // unix timestamp
  softwareVersion: string;
  storage: StorageInfo;
};

export type PNode = {
  nodeId: string;
  ip: string;
  gossip: GossipInfo;
};

export type PNodeRpcResponse = {
  jsonrpc: "2.0";
  id: number;
  result: PNode[];
};
