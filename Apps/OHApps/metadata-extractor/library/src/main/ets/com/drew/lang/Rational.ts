/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

class Rational {
  /** Holds the numerator. */
  private readonly _numerator: number;

  /** Holds the denominator. */
  private readonly _denominator: number;

  /**
   * Creates a new instance of Rational.  Rational objects are immutable, so
   * once you've set your numerator and denominator values here, you're stuck
   * with them!
   */
  constructor(numerator: number, denominator: number) {
    this._numerator = numerator;
    this._denominator = denominator;
  }

  /**
   * Returns the value of the specified number as a <code>double</code>.
   * This may involve rounding.
   *
   * @return the numeric value represented by this object after conversion
   *         to type <code>double</code>.
   */
  public numberValue(): number
  {
    return this._numerator == 0 ? 0.0 : this._numerator / this._denominator;
  }

  /**
   * Returns the value of the specified number as a <code>byte</code>.
   * This may involve rounding or truncation.  This implementation simply
   * casts the result of {@link Rational#doubleValue} to <code>byte</code>.
   *
   * @return the numeric value represented by this object after conversion
   *         to type <code>byte</code>.
   */
  public byteValue(): number
  {
    return this.numberValue();
  }

  /** Returns the denominator. */
  public getDenominator(): number
  {
    return this._denominator;
  }

  /** Returns the numerator. */
  public getNumerator(): number
  {
    return this._numerator;
  }

  /**
   * Returns the reciprocal value of this object as a new Rational.
   *
   * @return the reciprocal in a new object
   */
  public getReciprocal(): Rational
  {
    return new Rational(this._denominator, this._numerator);
  }

  /**
   * Returns the absolute value of this object as a new Rational.
   *
   * @return the absolute value in a new object
   */
  public getAbsolute(): Rational
  {
    return new Rational(Math.abs(this._numerator), Math.abs(this._denominator));
  }

  /** Checks if this {@link Rational} number is an Integer, either positive or negative. */
  public isInteger(): boolean
  {
    return this._denominator == 1 ||
    (this._denominator != 0 && (this._numerator % this._denominator == 0)) ||
    (this._denominator == 0 && this._numerator == 0);
  }

  /** Checks if either the numerator or denominator are zero. */
  public isZero(): boolean
  {
    return this._numerator == 0 || this._denominator == 0;
  }

  /** True if the value is non-zero and numerator and denominator are either both positive or both negative. */
  public isPositive(): boolean
  {
    return!this.isZero() && (this._numerator > 0 == this._denominator > 0);
  }

  /**
   * Returns a string representation of the object of form <code>numerator/denominator</code>.
   *
   * @return a string representation of the object.
   */
  public toString(): string
  {
    return this._numerator + "/" + this._denominator;
  }

  /** Returns the simplest representation of this {@link Rational}'s value possible. */
  public toSimpleString(allowDecimal: boolean): string
  {
    let simplifiedInstance = this.getSimplifiedInstance();
    if (this._denominator == 0 && this._numerator != 0) {
      return this.toString();
    } else if (this.isInteger()) {
      //            return this.intValue();
      return simplifiedInstance.numberValue().toString();
    } else if (this._numerator != 1 && this._denominator % this._numerator == 0) {
      // common factor between denominator and numerator
      let newDenominator = this._denominator / this._numerator;
      return new Rational(1, newDenominator).toSimpleString(allowDecimal);
    } else {
      if (allowDecimal) {
        let doubleString = simplifiedInstance.numberValue().toString();
        if (doubleString.length < 5) {
          return doubleString;
        }
      }
      return simplifiedInstance.toString();
    }
  }

  /**
   * Compares two {@link Rational} instances, returning true if they are mathematically
   * equivalent (in consistence with {@link Rational#equals(Object)} method).
   *
   * @param that the {@link Rational} to compare this instance to.
   * @return the value {@code 0} if this {@link Rational} is
   *         equal to the argument {@link Rational} mathematically; a value less
   *         than {@code 0} if this {@link Rational} is less
   *         than the argument {@link Rational}; and a value greater
   *         than {@code 0} if this {@link Rational} is greater than the argument
   *         {@link Rational}.
   */
  public compareTo(that: Rational): number {
    if (this.numberValue() < that.numberValue())
    return -1; // Neither val is NaN, thisVal is smaller
    if (this.numberValue() > that.numberValue())
    return 1; // Neither val is NaN, thisVal is larger
    if (this.numberValue() == that.numberValue())
    return 0;
  }

  /**
   * Indicates whether this instance and <code>other</code> are numerically equal,
   * even if their representations differ.
   *
   * For example, 1/2 is equal to 10/20 by this method.
   * Similarly, 1/0 is equal to 100/0 by this method.
   * To test equal representations, use EqualsExact.
   *
   * @param other The rational value to compare with
   */
  public equals(other: Rational): boolean {
    return other.numberValue() == this.numberValue();
  }

  /**
   * Indicates whether this instance and <code>other</code> have identical
   * Numerator and Denominator.
   * <p>
   * For example, 1/2 is not equal to 10/20 by this method.
   * Similarly, 1/0 is not equal to 100/0 by this method.
   * To test numerically equivalence, use Equals(Rational).</p>
   *
   * @param other The rational value to compare with
   */
  public equalsExact(other: Rational): boolean {
    return this.getDenominator() == other.getDenominator() && this.getNumerator() == other.getNumerator();
  }

  public hashCode(): number
  {
    return (23 * this._denominator) + this._numerator;
  }

  /**
   * <p>
   * Simplifies the representation of this {@link Rational} number.</p>
   * <p>
   * For example, 5/10 simplifies to 1/2 because both Numerator
   * and Denominator share a common factor of 5.</p>
   * <p>
   * Uses the Euclidean Algorithm to find the greatest common divisor.</p>
   *
   * @return A simplified instance if one exists, otherwise a copy of the original value.
   */
  public getSimplifiedInstance(): Rational
  {
    let gcd = Rational.GCD(this._numerator, this._denominator);

    return new Rational(this._numerator / gcd, this._denominator / gcd);
  }

  private static GCD(a: number, b: number): number
  {
    if (a < 0)
    a = -a;
    if (b < 0)
    b = -b;

    while (a != 0 && b != 0) {
      if (a > b)
      a %= b;
      else
      b %= a;
    }

    return a == 0 ? b : a;
  }
}

export default Rational
