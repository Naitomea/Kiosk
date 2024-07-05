import React, { createContext, useState } from 'react';

const TaxonomyContext = createContext();

const TaxonomyProvider = ({ children }) => {
  const [taxonomy, setTaxonomy] = useState({});
  const [nodes, setNodes] = useState({});
  const [fetching, setFetching] = useState(false);

  return (
    <TaxonomyContext.Provider value={{
      taxonomy, 
      setTaxonomy, 
      nodes,
      setNodes,
      fetching,
      setFetching,
    }}>
      {children}
    </TaxonomyContext.Provider>
  );
};

export { TaxonomyContext, TaxonomyProvider };
