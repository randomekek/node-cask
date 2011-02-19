# node-cask

This is a clone of bitcask log-based key-value store for node.js

It is a simple implementation ~140 lines of code. 

The backing to file system uses node-mmap to persist the data to disk. See https://github.com/bnoordhuis/node-mmap

## Blocking

The main issue of using mmap is that it is blocking, so use this library carefully! However, the way mmap works, reads are directly from memory when the OS caches the files.

In the test.js file provided I can get around 250k random reads/sec and 60k writes/sec. These writes are of size: 50 char keys and 800 char values.

On my computer with about 2gb ram, when the data size is over 1.5gb the read performance falls off a cliff.

Although blocking, performance is acceptable if:

* More reads than writes, and
* Data set fits in memory

## Complete API overview

    var cask = require('./cask'),
        db = cask.open('name');
    
    // returns null
    var x = db.get('missing key');
    
    // sets a key
    db.set('hello בעולם', 'hello 世界');

    // fetches the value
    var x = db.get('hello בעולם');

## Log based

The main issue with log-based stores is that it will spit out lots of files.

Your changes do not get updated in place on the backing store. This is a downside for filesize, but good for disk write speed.

Bitcask paper did not have a description of how to do continuous compaction.
