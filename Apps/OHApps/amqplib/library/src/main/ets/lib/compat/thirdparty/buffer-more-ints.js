
var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;

// Check that a value is an integer within the given range
function check_value(val, min, max) {
    val = +val;
    if (typeof(val) != 'number' || val < min || val > max || Math.floor(val) !== val) {
        throw new TypeError("\"value\" argument is out of bounds");
    }
    return val;
}

// Check that something is within the Buffer bounds
function check_bounds(buf, offset, len) {
    if (offset < 0 || offset + len > buf.length) {
        throw new RangeError("Index out of range");
    }
}

let readUInt64BE = function(buf, offset) {
    return buf.readUInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
}

let writeUInt64BE = function(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffffffffff);
    console.info('check_value = ' + val)
    check_bounds(buf, offset, 8);

    if (val < 0x10000000000000000) {
        buf.writeUInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
        buf.writeInt32BE(val & -1, offset + 4);
    } else {
        // Special case because 2^64-1 gets rounded up to 2^64
        buf[offset] = 0xff;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0xff;
        buf[offset+7] = 0xff;
    }
}

let readUInt64LE = function(buf, offset) {
    return buf.readUInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}

let writeUInt64LE = function(buf, val, offset) {
    val = check_value(val, 0, 0xffffffffffffffff);
    check_bounds(buf, offset, 8);

    if (val < 0x10000000000000000) {
        buf.writeInt32LE(val & -1, offset);
        buf.writeUInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    } else {
        // Special case because 2^64-1 gets rounded up to 2^64
        buf[offset] = 0xff;
        buf[offset+1] = 0xff;
        buf[offset+2] = 0xff;
        buf[offset+3] = 0xff;
        buf[offset+4] = 0xff;
        buf[offset+5] = 0xff;
        buf[offset+6] = 0xff;
        buf[offset+7] = 0xff;
    }
}

let readInt64BE = function(buf, offset) {
    return buf.readInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
}

let readInt64LE = function(buf, offset) {
    return buf.readInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
}

export { readUInt64BE, writeUInt64BE, readUInt64LE, writeUInt64LE, readInt64BE, readInt64LE }