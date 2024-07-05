// Tree.jsx
import React from 'react';
import TreeNode from './TreeNode';

const Tree = ({taxonomy}) => (
  <div>
    {taxonomy.map(root => (
      <TreeNode key={root._id} node={root} />
    ))}
  </div>
);

export default Tree;
