const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event && event.partitionKey) {
    let { partitionKey } = event
    partitionKey = partitionKey.toString();
    candidate = partitionKey.length > MAX_PARTITION_KEY_LENGTH ? createHashKey(partitionKey) : partitionKey;
  } else if(event) {
    const data = JSON.stringify(event);
    candidate = createHashKey(data);
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};

const createHashKey = (string) => {
  return crypto.createHash("sha3-512").update(string).digest("hex")
}