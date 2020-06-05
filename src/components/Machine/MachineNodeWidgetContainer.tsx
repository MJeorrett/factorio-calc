import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';

import { MachineNodeModel } from './MachineNodeModel';
import { MachineNodeWidget } from './MachineNodeWidget';
import { getLabel } from '../../data';

type MachineNodeWidgetContainerProps = {
  engine: DiagramEngine,
  node: MachineNodeModel,
};

export const MachineNodeWidgetContainer: React.SFC<MachineNodeWidgetContainerProps> = ({
  engine,
  node,
}) => {
  return (
    <MachineNodeWidget
      engine={engine}
      selectedRecipe={node.selectedRecipe}
      isSelected={node.isSelected()}
      machineName={node.machineName}
      machineCategory={node.machineCategory}
      label={getLabel(node.machineName)}
      recipes={node.recipes}
      ingredientPorts={node.ingredientPorts}
      resultPorts={node.resultPorts}
      setMachineName={node.setMachineName}
      setSelectedRecipeName={node.setSelectedRecipeName}
    />
  );
};
