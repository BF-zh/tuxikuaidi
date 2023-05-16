module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1683965302637, function(require, module, exports) {
(function (root, factory) {
  

  // AMD
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  // CommonJS
  else if (typeof exports === 'object') {
    module.exports = factory();
  }
  // Browser
  else {
    root.add = factory();
  }
})(this, function () {
  

  // The minimum machine rounding error
  var Epsilon = Math.pow(2, -53)
    , EpsilonReciprocal = (1 / Epsilon)
      /// The smallest positive number that can be represented
    , Eta = Math.pow(2, -1074)
      // limitB is a constant used in the transform function
    , limitB = 0.5 * EpsilonReciprocal * Eta

  /**
  * S. M. RUMP, T. OGITA AND S. OISHI
  * http://www.ti3.tu-harburg.de/paper/rump/RuOgOi07I.pdf
  */

  // Page 8
  // x is result, y is error
  // third is so the array is allocated for 4 spaces
  // it speeds up transform
  function fastTwoSum(a, b) {
    var x = a + b
      , q = x - a
      , y = b - q

    return [x, y, null]
  }

  // Page 12
  // p = q + p'
  // sigma is a power of 2 greater than or equal to |p|
  function extractScalar(sigma, p) {
    var q = (sigma + p) - sigma
      , pPrime = p - q

    return [q, pPrime]
  }

  // Page 12
  function extractVector(sigma, p) {
    var tau = 0.0
      , extracted
      , i = 0
      , ii = p.length
      , pPrime = new Array(ii)

    for(; i<ii; ++i) {
      extracted = extractScalar(sigma, p[i])
      pPrime[i] = extracted[1]
      tau += extracted[0]
    }

    return [tau, pPrime]
  }

  // Finds the immediate power of 2 that is larger than p
  //// in a fast way
  function nextPowerTwo (p) {
    var q = EpsilonReciprocal * p
      , L = Math.abs((q + p) - q)

    if(L === 0)
      return Math.abs(p)

    return L
  }

  // Helper, gets the maximum of the absolute values of an array
  function maxAbs(arr) {
    var i = 0
      , ii = arr.length
      , best = -1

    for(; i<ii; ++i) {
      if(Math.abs(arr[i]) > best) {
        best = arr[i]
      }
    }

    return best
  }

  function transform (p) {
    var mu = maxAbs(p)
      , M
      , sigmaPrime
      , tPrime
      , t
      , tau
      , sigma
      , extracted
      , res

        // Not part of the original paper, here for optimization
      , temp
      , bigPow
      , limitA
      , twoToTheM

    if(mu === 0) {
      return [0, 0, p, 0]
    }

    M = nextPowerTwo(p.length + 2)
    twoToTheM = Math.pow(2, M)
    bigPow = 2 * twoToTheM // equiv to Math.pow(2, 2 * M), faster
    sigmaPrime = twoToTheM * nextPowerTwo(mu)
    tPrime = 0

    do {
      t = tPrime
      sigma = sigmaPrime
      extracted = extractVector(sigma, p)
      tau = extracted[0]
      tPrime = t + tau
      p = extracted[1]

      if(tPrime === 0) {
        return transform(p)
      }

      temp = Epsilon * sigma
      sigmaPrime = twoToTheM * temp
      limitA = bigPow * temp
    }
    while( Math.abs(tPrime) < limitA && sigma > limitB )

    // res already allocated for 4
    res = fastTwoSum(t, tau)
    res[2] = p

    return res
  }

  function dumbSum(p) {
    var i, ii, sum = 0.0
    for(i=0, ii=p.length; i<ii; ++i) {
      sum += p[i]
    }
    return sum
  }

  function accSum(p) {

    // Zero length array, or all values are zeros
    if(p.length === 0 || maxAbs(p) === 0) {
      return 0
    }

    var tfmd = transform(p)

    return tfmd[0] + (tfmd[1] +dumbSum(tfmd[2]))
  }


  // exports
  accSum.dumbSum = dumbSum;
  accSum.fastTwoSum = fastTwoSum;
  accSum.nextPowerTwo = nextPowerTwo;
  return accSum;
});


}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1683965302637);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map