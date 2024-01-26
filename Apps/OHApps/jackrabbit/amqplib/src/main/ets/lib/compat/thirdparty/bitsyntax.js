
import * as ints from './buffer-more-ints'

let parse_int = function (bin, off, sizeInBytes, bigendian, signed) {
    switch (sizeInBytes) {
        case 1:
            return (signed) ? bin.readInt8(off) : bin.readUInt8(off);
        case 2:
            return (bigendian) ?
                    (signed) ? bin.readInt16BE(off) : bin.readUInt16BE(off) :
                    (signed) ? bin.readInt16LE(off) : bin.readUInt16LE(off);
        case 4:
            return (bigendian) ?
                    (signed) ? bin.readInt32BE(off) : bin.readUInt32BE(off) :
                    (signed) ? bin.readInt32LE(off) : bin.readUInt32LE(off);
        case 8:
            return (bigendian) ?
            ((signed) ? ints.readInt64BE : ints.readUInt64BE)(bin, off) :
            ((signed) ? ints.readInt64LE : ints.readUInt64LE)(bin, off);
        default:
            throw "Integers must be 8-, 16-, 32- or 64-bit";
    }
}


let write_int = function (buf, value, offset, size, bigendian) {
    switch (size) {
        case 1:
            buf.writeUInt8(value, offset);
            break;
        case 2:
                (bigendian) ?
            buf.writeUInt16BE(value, offset) :
            buf.writeUInt16LE(value, offset);
            break;
        case 4:
                (bigendian) ?
            buf.writeUInt32BE(value, offset) :
            buf.writeUInt32LE(value, offset);
            break;
        case 8:
                (bigendian) ?
            ints.writeUInt64BE(buf, value, offset) :
            ints.writeUInt64LE(buf, value, offset);
            break;
        default:
            throw new Error("integer size * unit must be 8, 16, 32 or 64");
    }
    return size;
}

export { parse_int, write_int }