# Underscore单元测试用例

该测试用例基于OpenHarmony系统下，进行单元测试

单元测试用例覆盖情况

|                       接口名                        |是否通过	|备注|
|:------------------------------------------------:|:---:|:---:|
|                first(array, [n])                 |    pass        |       |
|               rest(array, [index])               |pass   |        |
|               initial(array, [n])                |pass   |        |
|                 last(array, [n])                 |pass   |        |
|                  compact(list)                   |    pass    |       |
|             flatten(array, [depth])              |pass   |        |
|             without(array, *values)              |pass   |        |
| sortedIndex(array, value, [iteratee], [context]) |pass   |        |
|       uniq(array, [isSorted], [iteratee])        |pass   |        |
|              intersection(*arrays)               |pass   |        |
|                  union(*arrays)                  |pass | |
|            difference(array, *others)            |    pass        |       |
|                   zip(*arrays)                   |pass   |        |
|                   unzip(array)                   |pass   |        |
|              object(list, [values])              |pass   |        |
|        indexOf(array, value, [isSorted])         |    pass    |       |
|      lastIndexOf(array, value, [fromIndex])      |pass   |        |
|      findIndex(array, predicate, [context])      |pass   |        |
|    findLastIndex(array, predicate, [context])    |pass   |        |
|           range([start], stop, [step])           |pass   |        |
|               chunk(array, length)               |pass   |        |
|                  values(object)                  |pass | |
|         each(list, iteratee, [context])          |    pass        |       |
|          map(list, iteratee, [context])          |pass   |        |
|    reduce(list, iteratee, [memo], [context])     |pass   |        |
|  reduceRight(list, iteratee, [memo], [context])  |pass   |        |
|         find(list, predicate, [context])         |    pass    |       |
|        filter(list, predicate, [context])        |pass   |        |
|             where(list, properties)              |pass   |        |
|        reject(list, predicate, [context])        |pass   |        |
|       every(list, [predicate], [context])        |pass   |        |
|        some(list, [predicate], [context])        |pass   |        |
|        includes(array, value, [context])         |pass | |
|           findWhere(list, properties)            |    pass        |       |
|       invoke(list, methodName, *arguments)       |pass   |        |
|            pluck(list, propertyName)             |pass   |        |
|         max(list, [iteratee], [context])         |pass   |        |
|         min(list, [iteratee], [context])         |    pass    |       |
|        sortBy(list, iteratee, [context])         |pass   |        |
|        groupBy(list, iteratee, [context])        |pass   |        |
|        indexBy(list, iteratee, [context])        |pass   |        |
|        countBy(list, iteratee, [context])        |pass   |        |
|                  shuffle(list)                   |pass   |        |
|                sample(list, [n])                 |pass   |        |
|                  toArray(list)                   |pass   |        |
|                    size(list)                    |pass   |        |
|            partition(list, predicate)            |    pass    |       |
|          partial(function, *arguments)           |pass   |        |
|        delay(function, wait, *arguments)         |pass   |        |
|           defer(function, *arguments)            |pass   |        |
|       throttle(function, wait, [options])        |pass   |        |
|                  once(function)                  |pass   |        |
|             wrap(function, wrapper)              |pass   |        |
|                negate(predicate)                 |pass   |        |
|               compose(*functions)                |pass   |        |
|              after(count, function)              |    pass    |       |
|             before(count, function)              |pass   |        |
|            iteratee(value, [context])            |pass   |        |
|        memoize(function, [hashFunction])         |pass   |        |
|                 identity(value)                  |pass   |        |
|                 constant(value)                  |pass   |        |
|                      noop()                      |pass   |        |
|                   toPath(path)                   |pass   |        |
|                 random(min, max)                 |pass   |        |
|                      now()                       |    pass    |       |
|                uniqueId([prefix])                |pass   |        |
|                  escape(string)                  |pass   |        |
|                 unescape(string)                 |pass   |        |
|       template(templateString, [settings])       |pass   |        |
|                   keys(object)                   |pass   |        |
|                 allKeys(object)                  |pass   |        |
|                  values(object)                  |pass   |        |
|                  pairs(object)                   |pass   |        |
|                  invert(object)                  |    pass    |       |
|                functions(object)                 |pass   |        |
|          extend(destination, *sources)           |pass   |        |
|         extendOwn(destination, *sources)         |pass   |        |
|               pick(object, *keys)                |pass   |        |
|               omit(object, *keys)                |pass   |        |
|                  clone(object)                   |pass   |        |
|             create(prototype, props)             |pass   |        |
|              isEqual(object, other)              |pass   |        |
|               isEmpty(collection)                |    pass    |       |
|                isElement(object)                 |pass   |        |
|               isArguments(object)                |pass   |        |
|                 isObject(value)                  |pass   |        |
|                 isArray(object)                  |pass   |        |
|                 isString(object)                 |pass   |        |
|                 isSymbol(object)                 |pass   |        |
|                 isNumber(object)                 |pass   |        |
|                isBoolean(object)                 |pass   |        |
|                  isMap(object)                   |    pass    |       |
|                isWeakMap(object)                 |pass   |        |
|                  isSet(object)                   |pass   |        |
|                isWeakSet(object)                 |pass   |        |
|                isFunction(object)                |pass   |        |
|                  isDate(object)                  |pass   |        |
|                 isRegExp(object)                 |pass   |        |
|                 isFinite(object)                 |pass   |        |
|                  isNaN(object)                   |pass   |        |
|                  isNull(object)                  |    pass    |       |
|                isUndefined(value)                |pass   |        |
|                 isError(object)                  |pass   |        |
|             tap(object, interceptor)             |pass   |        |
|                 has(object, key)                 |pass   |        |
|           get(object, path, [default])           |pass   |        |
|                  property(path)                  |pass   |        |
|                propertyOf(object)                |pass   |        |
|           isMatch(object, properties)            |pass   |        |
|                  matcher(attrs)                  |    pass    |       |
|      findKey(object, predicate, [context])       |pass   |        |
|     mapObject(object, iteratee, [context])       |pass   |        |
