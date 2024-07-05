export function createTaxonomyString(taxonomy) {
  return taxonomy && taxonomy.topic && taxonomy.subTopic
    ? `${taxonomy.topic}/${taxonomy.subTopic}`
    : null;
}

export function createTaxonomyPathname(taxonomy) {
  return taxonomy && taxonomy.topic && taxonomy.subTopic
    ? `/${createTaxonomyString(taxonomy)}`
    : null;
}

export function getTaxonomyFromString(str) {
  const taxonomy = str.split('/');
  return taxonomy.length === 2 
    ? { topic: taxonomy[0], subTopic: taxonomy[1] }
    : null;
}

export function getTaxonomyFromPathname(pathname) {
  return getTaxonomyFromString(pathname.slice(1));
}

export function isTaxonomyValid(taxonomy, topic, subTopic) {
  return taxonomy && taxonomy[topic] && taxonomy[topic][subTopic];
}