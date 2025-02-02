import { traverse, clearCache } from './traverse';
import { sampleArray, sampleBoolean, sampleNumber, sampleObject, sampleString } from './samplers/index';

export var _samplers = {};

const defaults = {
  skipReadOnly: false,
  maxSampleDepth: 150,
  ticks: 10000,
};

export function sample(schema, options, doc = schema) {
  let opts = Object.assign({}, defaults, options);
  clearCache();
  return traverse(schema, opts, doc).value;
};

export function _registerSampler(type, sampler) {
  _samplers[type] = sampler;
};

export { inferType } from './infer';

_registerSampler('array', sampleArray);
_registerSampler('boolean', sampleBoolean);
_registerSampler('integer', sampleNumber);
_registerSampler('number', sampleNumber);
_registerSampler('object', sampleObject);
_registerSampler('string', sampleString);
