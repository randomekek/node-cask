var cask = require('./cask'),
    assert = require('assert');
    
var write = true;

var f = cask.open('temp');

assert.ok(f.get('missing') == null);

if(write) f.set('key1', 'hello world');
assert.ok(f.get('key1')=='hello world');

if(write) f.set('key2', 'hello 世界');
assert.ok(f.get('key2')=='hello 世界');

if(write) f.set('hello בעולם', 'value 3');
assert.ok(f.get('hello בעולם')=='value 3');

var value = 'not particularly long value that will get stored.\n'; 
for(i=0; i<4; i++) {
    value += value;
}
for(i=0; i<100000; i++) {
    if(write) f.set('key prefix to increase key size a little bit' + i, value);
}

assert.ok(f.get('key prefix to increase key size a little bit' + 39488) == value);

f.close();
