describe("BatmanFraction Initialization Testing", function () 
{
    var x;

    it("BatmanFraction exists and its a function which returns object", function () {
        expect((typeof BatmanFraction !== 'undefined')).toEqual(true);
        expect(typeof BatmanFraction).toEqual('function');
        expect(typeof new BatmanFraction()).toEqual('object');
    });
    
    it("Init by decimal input (10)", function () {
        x = new BatmanFraction(10);
        expect(x.toNumber()).toEqual(10);
        expect(x.toString()).toEqual('10');
        expect(x.getDecimal()).toEqual(10);
        expect(x.getCeilPart()).toEqual(10);
        expect(x.getNumerator()).toEqual(null);
        expect(x.getDenominator()).toEqual(null);
        expect(x.getAll()).toEqual({'c': 10, 'n': null, 'd': null});
    });

    it("Zero init", function () {
        x = new BatmanFraction('ABC');
        expect(x.toNumber()).toEqual(0);
        x = new BatmanFraction(0);
        expect(x.toNumber()).toEqual(0);
        x = new BatmanFraction();
        expect(x.toNumber()).toEqual(0);
        x = new BatmanFraction(0, 0, 0);
        expect(x.toNumber()).toEqual(0);
    });

    it("Init by rational input (1/2)", function () {
        x = new BatmanFraction(0, 1, 2);
        expect(x.toNumber()).toEqual(0.5);
        expect(x.toString()).toEqual('0.5');
        expect(x.getDecimal()).toEqual(0.5);
        expect(x.getCeilPart()).toEqual(0);
        expect(x.getNumerator()).toEqual(1);
        expect(x.getDenominator()).toEqual(2);
        expect(x.getAll()).toEqual({'c': 0, 'n': 1, 'd': 2});
    });

    it("Init by rational input (3 + 2/7)", function () {
        x = new BatmanFraction(3, 2, 7);
        expect((x.toNumber() > 3)).toEqual(true);
        expect(/^3\.28/.test(x.toString())).toEqual(true);
        expect((x.getDecimal() > 3)).toEqual(true);
        expect(x.getCeilPart()).toEqual(3);
        expect(x.getNumerator()).toEqual(2);
        expect(x.getDenominator()).toEqual(7);
        expect(x.getAll()).toEqual({'c': 3, 'n': 2, 'd': 7});
    });
});

describe("BatmanFraction Calculator Testing", function () 
{
    var x;

    it("2.0615 by number", function () {
        expect(function() {
            x = new BatmanFraction(2.0615);
            return x.getAll();
        }()).toEqual({'c': 2, 'n': 123, 'd': 2000});
    });

    it("2.0615 by string", function () {
        expect(function() {
            x = new BatmanFraction("2.0615");
            return x.getAll();
        }()).toEqual({'c': 2, 'n': 123, 'd': 2000});
    });

    it("45.712391273494", function () {
        expect(function() {
            x = new BatmanFraction(45.712391273494);
            return x.getAll();
        }()).toEqual({'c': 45, 'n': 712391, 'd': 1000000});
        expect(function() {
            x = new BatmanFraction(45.712391273494, 3);
            return x.getAll();
        }()).toEqual({'c': 45, 'n': 89, 'd': 125});
    });

    it("one", function () {
        expect(function() {
            x = new BatmanFraction(1);
            return x.getAll();
        }()).toEqual({'c': 1, 'n': null, 'd': null});
    });

    it("-2221.39", function () {
        expect(function() {
            x = new BatmanFraction(-2221.39);
            return x.getAll();
        }()).toEqual({'c': -2221, 'n': 39, 'd': 100});
        expect(function() {
            x = new BatmanFraction(-2221.39, 1);
            return x.getAll();
        }()).toEqual({'c': -2221, 'n': 2, 'd': 5});
        expect(function() {
            x = new BatmanFraction(-2221.39);
            x.setAccuracy(1);
            return x.getAll();
        }()).toEqual({'c': -2221, 'n': 2, 'd': 5});
    });

    it("0.5", function () {
        expect(function() {
            x = new BatmanFraction(0.5);
            return x.getAll();
        }()).toEqual({'c': 0, 'n': 1, 'd': 2});
    });
});

describe("BatmanFraction Methods Testing", function () 
{
    var x = new BatmanFraction(2.0615);

    it("Do nothing", function () {
        expect(x.getAll()).toEqual({'c': 2, 'n': 123, 'd': 2000});
    });

    it("setCeilPart, setNumerator, setDenominator", function () {
        expect(function() {
            x.setCeilPart(100);
            x.setNumerator(1);
            x.setDenominator(1000000000);
            return x.getAll();
        }()).toEqual({'c': 100, 'n': 1, 'd': 1000000000});
        expect(x.toNumber()).toEqual(100.000000001);
    });

    it("setDecimal", function () {
        expect(function() {
            x.setDecimal(5000);
            return x.getAll();
        }()).toEqual({'c': 5000, 'n': null, 'd': null});
        expect(x.toNumber()).toEqual(5000);
    });

    it("setAccuracy", function () {
        expect(function() {
            x.setDecimal(0.500000000000001);
            x.setAccuracy(1);
            return x.getAll();
        }()).toEqual({'c': 0, 'n': 1, 'd': 2});
        expect(x.toNumber()).toEqual(0.500000000000001);
    });

    it("takeDecimalFromRational", function () {
        expect(function() {
            x.takeDecimalFromRational();
            return x.getAll();
        }()).toEqual({'c': 0, 'n': 1, 'd': 2});
        expect(x.toNumber()).toEqual(0.5);
    });

    it("isCeilNum", function () {
        expect(x.isCeilNum()).toEqual(false);
        x.setDecimal(5000);
        expect(x.isCeilNum()).toEqual(true);
    });
});