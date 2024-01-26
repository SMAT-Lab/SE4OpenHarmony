'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Long = require('./long')

var MIN_RADIX = 2;
var MAX_RADIX = 36;

var bitsPerDigit = [ 0, 0,
    1024, 1624, 2048, 2378, 2648, 2875, 3072, 3247, 3402, 3543, 3672,
    3790, 3899, 4001, 4096, 4186, 4271, 4350, 4426, 4498, 4567, 4633,
    4696, 4756, 4814, 4870, 4923, 4975, 5025, 5074, 5120, 5166, 5210,
    5253, 5295
];

var digitsPerInt = [0, 0, 30, 19, 15, 13, 11,
    11, 10, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5
];

var intRadix = [0, 0,
    0x40000000, 0x4546b3db, 0x40000000, 0x48c27395, 0x159fd800,
    0x75db9c97, 0x40000000, 0x17179149, 0x3b9aca00, 0xcc6db61,
    0x19a10000, 0x309f1021, 0x57f6c100, 0xa2f1b6f,  0x10000000,
    0x18754571, 0x247dbc80, 0x3547667b, 0x4c4b4000, 0x6b5a6e1d,
    0x6c20a40,  0x8d2d931,  0xb640000,  0xe8d4a51,  0x1269ae40,
    0x17179149, 0x1cb91000, 0x23744899, 0x2b73a840, 0x34e63b41,
    0x40000000, 0x4cfa3cc1, 0x5c13d840, 0x6d91b519, 0x39aa400
];


var MAX_CONSTANT = 16;


 function copyOfRange(original, from, to) {
    var newLength = to - from;
    if (newLength < 0)
        throw new Error(from + " > " + to);
    var copy = new Array(newLength);
    arraycopy(original, from, copy, 0, Math.min(original.length - from, newLength));
    return copy;
}

  function arraycopy(src, srcPos, dest, destPos, length) {
    for (var i = srcPos; i < (srcPos + length); i++) {
        dest[destPos++] = src[i];
    }
};

  function intArray(length) {
    var array = new Array(length);
    for (var i = 0; i < length; i++) {
        array[i] = 0;
    }
    return array;
};


/* zero[i] is a string of i consecutive zeros. */
var zeros = intArray(64);
zeros[63] = "000000000000000000000000000000000000000000000000000000000000000";
for (var i = 0; i < 63; i++)
    zeros[i] = zeros[63].substring(0, i);


function BigInteger() {
    this.signum;
    this.mag;
    this._bitLength = 0;
    this.bitCount = 0;
    this.firstNonzeroIntNum = 0;
    this.lowestSetBit = 0;
}

/**
 * Translates a byte array containing the two's-complement binary
 * representation of a BigInteger into a BigInteger.  The input array is
 * assumed to be in <i>big-endian</i> byte-order: the most significant
 * byte is in the zeroth element.
 *
 * @param  val big-endian two's-complement binary representation of
 *         BigInteger.
 * @throws NumberFormatException {@code val} is zero bytes long.
 */
BigInteger.fromBuffer = function (signum, magnitude) {
    var _bigInteger = new BigInteger();
    _bigInteger.mag = _bigInteger._stripLeadingZeroBytes(magnitude);

    if (signum < -1 || signum > 1)
        throw new Error("Invalid signum value");

    if (_bigInteger.mag.length==0) {
        _bigInteger.signum = 0;
    } else {
        if (signum == 0)
            throw new Error("signum-magnitude mismatch");
        _bigInteger.signum = signum;
    }
    return _bigInteger;
};



/**
 * Translates the String representation of a BigInteger in the
 * specified radix into a BigInteger.  The String representation
 * consists of an optional minus or plus sign followed by a
 * sequence of one or more digits in the specified radix.  The
 * character-to-digit mapping is provided by {@code
 * Character.digit}.  The String may not contain any extraneous
 * characters (whitespace, for example).
 *
 * @param val String representation of BigInteger.
 * @param radix radix to be used in interpreting {@code val}.
 * @throws NumberFormatException {@code val} is not a valid representation
 *         of a BigInteger in the specified radix, or {@code radix} is
 *         outside the range from {@link Character#MIN_RADIX} to
 *         {@link Character#MAX_RADIX}, inclusive.
 * @see    Character#digit
 */
BigInteger.fromString = function (val, radix) {
    radix = radix || 10;
    var cursor = 0;
    var numDigits;
    var len = val.length;
    if (radix < MIN_RADIX || radix > MAX_RADIX) {
        throw new Error('Radix out of range');
    }
    if (len === 0) {
        throw new Error("Zero length BigInteger");
    }
    var sign = 1;
    var index1 = val.lastIndexOf('-');
    var index2 = val.lastIndexOf('+');
    if ((index1 + index2) <= -1) {
        if (index1 === 0 || index2 === 0) {
            cursor = 1;
            if (len === 1) {
                throw new Error("Zero length BigInteger");
            }
        }
        if (index1 === 0) {
            sign = -1;
        }
    } else {
        throw new Error("Illegal embedded sign character");
    }
    var _bigInteger = new BigInteger();
    /*跳过前导的0，如果全部是0，直接储存ZERO.mag*/
    // Skip leading zeros and compute number of digits in magnitude
    while (cursor < len && parseInt(val.substring(cursor + 1, 1), radix) === 0) {
        cursor++;
    }
    if (cursor === len) {
        // _bigInteger.signum = 0;
        // _bigInteger.mag = new Buffer([0]);
        return ZERO;
    }
    numDigits = len - cursor;
    _bigInteger.signum = sign;
    // Pre-allocate array of expected size. May be too large but can
    // never be too small. Typically exact.
    var numBits = parseInt(((numDigits * bitsPerDigit[radix]) >>> 10) + 1, 10);
    var numWords = (numBits + 31) >>> 5;
    // 存储转换后的数字
    var magnitude = intArray(numWords);
    // for (var i = 0; i < numWords; i++)
    // magnitude[i] = 0;

    var firstGroupLen = numDigits % digitsPerInt[radix];
    if (firstGroupLen === 0)
        firstGroupLen = digitsPerInt[radix];

    var group = val.substring(cursor, cursor += firstGroupLen);

    magnitude[numWords - 1] = parseInt(group, radix);
    if (magnitude[numWords - 1] < 0)
        throw new Error("Illegal digit");

    // Process remaining digit groups
    var superRadix = intRadix[radix];
    var groupVal = 0;
    while (cursor < len) {
        group = val.substring(cursor, cursor += digitsPerInt[radix]);
        groupVal = parseInt(group, radix);

        if (groupVal < 0)
            throw new Error("Illegal digit");
         _bigInteger._destructiveMulAdd(magnitude, superRadix, groupVal);
    }

    _bigInteger.mag = trustedStripLeadingZeroInts(magnitude);
    return _bigInteger;
};

/**
 * Returns a copy of the input array stripped of any leading zero bytes.
 */
BigInteger.prototype._stripLeadingZeroBytes = function (a) {
    var byteLength = a.length;
    var keep;

    // Find first nonzero byte
    for (keep = 0; keep < byteLength && a[keep] === 0; keep++)
        ;

    // Allocate new array and copy relevant part of input array
    var intLength = ((byteLength - keep) + 3) >>> 2;
    var result = intArray(intLength);
    var b = byteLength - 1;
    for (var i = intLength-1; i >= 0; i--) {
        result[i] = a[b--] & 0xff;
        var bytesRemaining = b - keep + 1;
        var bytesToTransfer = Math.min(3, bytesRemaining);
        for (var j=8; j <= (bytesToTransfer << 3); j += 8)
            result[i] |= ((a[b--] & 0xff) << j);
    }
    return result;
}

// Multiply x array times word y in place, and add word z
BigInteger.prototype._destructiveMulAdd = function (x, y, z) {
    // Perform the multiplication word by word
    var ylong = Long.fromNumber(y >>> 32);
    var zlong = z >>> 32;
    var len = x.length;
    var product = Long.ZERO;
    var carry = 0;
    for (var i = len-1; i >= 0; i--) {

        product = ylong.multiply( Long.fromNumber(x[i] >>> 32) ).add(Long.fromInt(carry));
        x[i] = product.low;
        carry = product.high;
    }
    // Perform the addition
    var sum = (x[len - 1] >>> 32) + zlong;
    sum = Long.fromNumber(sum);
    x[len-1] = sum.low;
    carry = sum.high;
    for (var i = len - 2 ; i >= 0; i--) {
        sum = Long.fromNumber((x[i] >>> 32) + carry);
        x[i] = sum.low;
        carry = sum.high;
    }

};

function trustedStripLeadingZeroInts(val) {
    var vlen = val.length;
    var keep;
    // Find first nonzero byte
    for (keep = 0; keep < vlen && val[keep] == 0; keep++)
        ;
    return keep == 0 ? val : copyOfRange(val, keep, vlen);
};




BigInteger.fromMag = function (magnitude, signum) {

    var _bigInteger = new BigInteger();

    if (typeof signum === 'undefined') {
        // @see BigInteger(int[] val)
        if (magnitude.length == 0)
            throw new Error("Zero length BigInteger");

        if (magnitude[0] < 0) {
            _bigInteger.mag = makePositive(magnitude);
            _bigInteger.signum = -1;
        } else {
            _bigInteger.mag = trustedStripLeadingZeroInts(magnitude);
            _bigInteger.signum = _bigInteger.length === 0 ? 0 : 1
        }

    } else {
        // @see BigInteger(int[] magnitude, int signum)
        _bigInteger.signum = (magnitude.length === 0 ? 0 : signum);
        _bigInteger.mag = magnitude;

    }

    return _bigInteger;

};


/**
 * Takes an array a representing a negative 2's-complement number and
 * returns the minimal (no leading zero ints) unsigned whose value is -a.
 * @param {int[]} a
 */
function makePositive(a) {
    var keep, j;

    // Find first non-sign (0xffffffff) int of input
    for (keep = 0; keep < a.length && a[keep] === -1; keep++)
        ;

    /* Allocate output array.  If all non-sign ints are 0x00, we must
     * allocate space for one extra output int. */
    for (j = keep; j < a.length && a[j] === 0; j++)
        ;
    var extraInt = (j === a.length ? 1 : 0);
    var result = intArray(a.length - keep + extraInt);

    /* Copy one's complement of input into output, leaving extra
     * int (if it exists) == 0x00 */
    for (var i = keep; i < a.length; i++)
        result[i - keep + extraInt] = ~a[i];

    // Add one to one's complement to generate two's complement
    for (var i = result.length - 1; ++result[i] === 0; i--)
        ;

    return result;
}



/**
 * Compares this BigInteger with the specified Object for equality.
 *
 * @param  x Object to which this BigInteger is to be compared.
 * @return {@code true} if and only if the specified Object is a
 *         BigInteger whose value is numerically equal to this BigInteger.
 */
BigInteger.prototype.equals = function (x) {
    // This test is just an optimization, which may or may not help
    // if (x === this)
    //   return true;

    if (x.constructor.name !== 'BigInteger')
        return false;

    var xInt = x;
    if (xInt.signum != this.signum)
        return false;

    var m = this.mag;
    var len = m.length;
    var xm = xInt.mag;
    if (len != xm.length)
        return false;

    for (var i = 0; i < len; i++){
        if (xm[i] != m[i]) {
            return false;
        }
    }

    return true;
}


/**
 * Initialize static constant array when class is loaded.
 */
var MAX_CONSTANT = 16;
var posConst = new Array(MAX_CONSTANT + 1);
var negConst = new Array(MAX_CONSTANT + 1);

for (var i = 1; i <= MAX_CONSTANT; i++) {
    var magnitude = intArray(1);
    magnitude[0] = i;
    posConst[i] = BigInteger.fromMag(magnitude,  1);
    negConst[i] = BigInteger.fromMag(magnitude, -1);
}


var ZERO = BigInteger.fromMag([], 0);
var ONE = BigInteger.fromMag([1], 1);

BigInteger.ZERO = ZERO;
BigInteger.ONE = ONE;

module.exports = BigInteger;

