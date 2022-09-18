const test = require("ava");
const { deterministicPartitionKey } = require("./dpk");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

test.serial('Function doesnt generate new key when an event with a valid partition key processed', t => {
    const mockEvent = {
        partitionKey: 300
    }
    const result = deterministicPartitionKey(mockEvent);
    // result is a valid string and is equal to partition key in the event
    t.true(result === JSON.stringify(mockEvent.partitionKey));
})

test.serial('Function generates new key when event without a partition key is processed', t => {
    const mockEvent = {
        message: 'event without partition key'
    }
    const result = deterministicPartitionKey(mockEvent)
    // result is valid string, well within limits & not equal to trivial partition
    t.true(result !== TRIVIAL_PARTITION_KEY);
    t.true(typeof result == 'string')
    t.true(result.length < MAX_PARTITION_KEY_LENGTH)
})

test.serial('Function returns trivial partition key when no event is passed', t => {
    const result = deterministicPartitionKey();
    // result is a valid string and is equal to trivial partition key
    t.true(result === TRIVIAL_PARTITION_KEY);
    t.true(typeof result === 'string');
})

test.serial('New key generated when partition key is greater than MAX_PARTITION_KEY_LENGTH', t => {
    const mockedPartitionKey = new Array(MAX_PARTITION_KEY_LENGTH + 10).join('1')
    const mockEvent = {
        partitionKey: mockedPartitionKey
    }
    const result = deterministicPartitionKey(mockEvent);
    // result is a valid string and length is less than MAX_PARTITION_KEY_LENGTH
    t.true(result !== mockedPartitionKey);
    t.true(typeof result == 'string')
    t.true(result.length < MAX_PARTITION_KEY_LENGTH);
})


