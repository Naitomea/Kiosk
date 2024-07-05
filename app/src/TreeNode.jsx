import React, {useState} from 'react';
import styles from './TreeNode.module.css'; 

const TreeNode = ({node, level = 0}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={styles.container} style={{marginLeft: (node.level - level) * 20}}>
      <div 
        className={styles.arrow} 
        style={{
          transform: open ? 'rotate(90deg)' : '', 
          cursor: hasChildren ? 'pointer' : 'default',
        }} 
        onClick={hasChildren ? () => setOpen(!open) : undefined}>
        {hasChildren ? '>' : '-'}
      </div>
      <div>{node.label}</div>
      {node.children.length > 0 && (
        <div className={styles.subTree} style={{height: open ? 'auto' : 0}}>
          {node.children.map(child => (
            <TreeNode key={child._id} node={child} level={level} />
          ))}
        </div>
      )}
    </div>
  )
};

export default TreeNode;
