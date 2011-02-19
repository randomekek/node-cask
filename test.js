var cask = require('./cask'),
    assert = require('assert');
    
var write = true,
    randomread = true;

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

var start = new Date().getTime();
for(i=0; i<200000; i++) {
    if(write) f.set('key prefix to increase key size a little bit' + i, value);
}
var end = new Date().getTime();
if(write) console.log('write test: ' + (end - start)/1000.0 + 's');

assert.ok(f.get('key prefix to increase key size a little bit' + 89293) == value);

var start = new Date().getTime();
for(i=0; i<200000; i++) {
    if(randomread) assert.ok(f.get('key prefix to increase key size a little bit' + Math.floor(Math.random()*200000)) == value);
}
var end = new Date().getTime();
if(randomread) console.log('random read test: ' + (end - start)/1000.0 + 's');

f.close();
