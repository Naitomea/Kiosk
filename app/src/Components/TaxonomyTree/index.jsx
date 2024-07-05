import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks/useTreeViewApiRef';

import { TaxonomyContext } from '../TaxonomyProvider';
import { 
  createTaxonomyPathname, 
  createTaxonomyString, 
  getTaxonomyFromPathname, 
  getTaxonomyFromString 
} from '../../Utils';

export default function TaxonomyTree() {
  const { taxonomy } = useContext(TaxonomyContext);

  const location = useLocation();
  const navigate = useNavigate();

  const selectedTaxonomy = getTaxonomyFromPathname(location.pathname);
  const selectedItem = createTaxonomyString(selectedTaxonomy);

  const handleSelectedItemsChange = (e, id) => {
    const selectedTaxonomy = getTaxonomyFromString(id);
    if (selectedTaxonomy)
      navigate(createTaxonomyPathname(selectedTaxonomy));
  };

  //#region AutoExpand

  const apiRef = useTreeViewApiRef();

  useEffect(() => {
    // Expand Topic
    if (selectedTaxonomy && taxonomy[selectedTaxonomy.topic]) {
      apiRef.current.setItemExpansion(null, selectedTaxonomy.topic, true);
    }
  }, [apiRef, selectedTaxonomy, taxonomy])

  //#endregion

  return (
    <SimpleTreeView sx={{py: 1}} 
      selectedItems={selectedItem}
      onSelectedItemsChange={handleSelectedItemsChange}
      apiRef={apiRef}
    >
      {
        Object.keys(taxonomy).map(topic => (
            <TreeItem key={topic} itemId={topic} label={topic}>
              {
                Object.keys(taxonomy[topic]).map(subTopic => {
                  return (
                    <TreeItem 
                      key={subTopic}
                      itemId={createTaxonomyString({topic, subTopic})} 
                      label={subTopic} />
                  );
                })
              }
            </TreeItem>
          )
        )
      }
    </SimpleTreeView>
  )
}