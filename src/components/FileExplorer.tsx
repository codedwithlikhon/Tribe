import { DirectoryNode, FileNode } from '../lib/types';

interface FileExplorerProps {
  tree: DirectoryNode;
  selectedPath: string | null;
  onSelect: (node: FileNode) => void;
}

function renderTree(node: DirectoryNode, selectedPath: string | null, onSelect: (node: FileNode) => void) {
  return (
    <ul className="file-tree">
      {node.children
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((child) => {
          if (child.type === 'directory') {
            return (
              <li key={child.path}>
                <strong>{child.name}</strong>
                {renderTree(child, selectedPath, onSelect)}
              </li>
            );
          }
          return (
            <li
              key={child.path}
              className={selectedPath === child.path ? 'active' : ''}
              onClick={() => onSelect(child)}
            >
              <span role="img" aria-label="file">
                📄
              </span>
              {child.name}
            </li>
          );
        })}
    </ul>
  );
}

export function FileExplorer({ tree, selectedPath, onSelect }: FileExplorerProps) {
  return (
    <div>
      <h2>Project files</h2>
      {tree.children.length === 0 ? <p>No files yet. Ask the assistant to scaffold a project.</p> : null}
      {renderTree(tree, selectedPath, onSelect)}
    </div>
  );
}
