/**
 * Class BatmanFraction
 *
 * How to use:
 * var x = new BatmanFraction(2.0615);
 * console.log(x.getAll());
 *
 * Constructor:
 * @param number mixedA - decimal number for decimal input (or ceil part for rational input)
 * @param number mixedB - rational accuracy for decimal input (or numerator for rational input)
 * @param number denominator - denominator for rational input
 * @param number accuracy - rational accuracy for rational input (by default 6)
 * @return object BatmanFraction
 */
function BatmanFraction(mixedA, mixedB, denominator, accuracy)
{
    if (mixedB && denominator)
    {
        this._ceilPart = mixedA * 1;
        this._numerator = mixedB * 1;
        this._denominator = denominator * 1;
        this._accuracy = (accuracy && (accuracy * 1) > 0) ? (accuracy * 1) : 6;
        this._decimalNum = this._ceilPart + (this._numerator / this._denominator);
    }
    else
    {
        this._decimalNum = (mixedA !== 0) ? (mixedA * 1) : null;
        this._ceilPart = null;
        this._numerator = null;
        this._denominator = null;
        this._accuracy = (mixedB && (mixedB * 1) > 0) ? (mixedB * 1) : 6;
    }

    if (isNaN(this._decimalNum)) {
        this._decimalNum = 0;
    }

    if (isNaN(this._ceilPart)) {
        this._ceilPart = 0;
    }

    if (isNaN(this._numerator)) {
        this._numerator = 0;
    }

    if (isNaN(this._denominator)) {
        this._denominator = 0;
    }

    this._calcStatus = false;

    this.setAccuracy = function(accuracy)
    {
        this._calcStatus = false;
        this._accuracy = (accuracy > 0) ? accuracy : this._accuracy;
        this._calcRational();
    }

    this.setDecimal = function(decimalNum)
    {
        this._calcStatus = false;
        this._decimalNum = decimalNum * 1;
        this._calcRational();
    }

    this.takeDecimalFromRational = function()
    {
        this._calcStatus = false;
        this._calcDecimal();
    }

    this.setCeilPart = function(ceilPart)
    {
        this._calcStatus = false;
        this._ceilPart = ceilPart * 1;
        this._calcDecimal();
    }

    this.setNumerator = function(numerator)
    {
        this._calcStatus = false;
        this._numerator = numerator * 1;
        this._calcDecimal();
    }

    this.setDenominator = function(denominator)
    {
        this._calcStatus = false;
        this._denominator = denominator * 1;
        this._calcDecimal();
    }

    this.getDecimal = function()
    {
        this._calc();
        return this._decimalNum
    }

    this.toNumber = function()
    {
        return this.getDecimal() * 1 // guaranteed number :)
    }

    this.toString = function()
    {
        return this.getDecimal().toString()
    }

    this.getCeilPart = function()
    {
        this._calc();
        return this._ceilPart
    }

    this.getNumerator = function()
    {
        this._calc();
        return this._numerator
    }

    this.getDenominator = function()
    {
        this._calc();
        return this._denominator
    }

    this.isCeilNum = function()
    {
        this._calc();
        return (this._numerator == null)
    }

    this.getAll = function()
    {
        this._calc();
        return {
            'c': this.getCeilPart(),
            'n': this.getNumerator(),
            'd': this.getDenominator()
        }
    }

    this.normalize = function()
    {
        this.setAccuracy(6);
    }

    this._calc = function()
    {
        if (!this._calcStatus) 
        {
            if (this._decimalNum === null)
            {
                if (!(this._numerator && this._denominator)) {
                    this._decimalNum = 0;
                } else {
                    this._calcDecimal();
                }
            }

            if (this._ceilPart === null)
            {
                this._calcRational();
            }

            this._calcStatus = true;
        }
    }

    this._calcDecimal = function()
    {
        this._decimalNum = (this._denominator !== 0) ? 
            (this._ceilPart + (this._numerator/this._denominator)) : 0
    }

    this._calcRational = function()
    {
        var dParts = this._decimalNum.toFixed(this._accuracy).toString().split('.'),
            m = dParts[1].length, numerator = dParts[1] * 1, ceil = dParts[0], 
            denominator = ('1' + new Array(m + 1).join('0')) * 1,
            gcd = numerator, cf = denominator, ratioModulus;

        while (cf != 0) // Euclidean algorithm
        {
            ratioModulus = gcd % cf;
            gcd = cf; cf = ratioModulus;
        }

        numerator /= gcd; denominator /= gcd;

        this._ceilPart = ceil * 1;
        this._numerator = (numerator !== 0) ? (numerator * 1) : null;
        this._denominator = (numerator !== 0) ? (denominator * 1) : null;
    }
}