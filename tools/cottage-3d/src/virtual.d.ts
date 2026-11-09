declare module 'virtual:lines-hash' {
  /** Fingerprint of the sources the baked linework depends on (see scripts/lines-hash.mjs). */
  const hash: string;
  export default hash;
}
