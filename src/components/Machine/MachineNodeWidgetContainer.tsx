import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';

import { getLabel } from '../../data';

import { MachineNodeModel } from './MachineNodeModel';
import { MachineNodeWidget } from './MachineNodeWidget';
import { MachineNodeWidgetControls } from './MachineNodeWidgetControls';

type MachineNodeWidgetContainerProps = {
  engine: DiagramEngine,
  node: MachineNodeModel,
};

export const MachineNodeWidgetContainer: React.SFC<MachineNodeWidgetContainerProps> = ({
  engine,
  node,
}) => {
  const handleSelectMachine = (event: React.FormEvent) => {
    const selectElement = event.target as HTMLSelectElement;
    node.setMachineName(selectElement.value);
    engine.repaintCanvas();
  };

  const handleSelectRecipe = (event: React.FormEvent) => {
    const selectElement = event.target as HTMLSelectElement;
    node.setSelectedRecipeName(selectElement.value);
    engine.repaintCanvas();
  };
  return (
    <>
      <MachineNodeWidget
        engine={engine}
        selectedRecipe={node.selectedRecipe}
        isSelected={node.isSelected()}
        machineName={node.machineName}
        label={getLabel(node.machineName)}
        ingredientPorts={node.ingredientPorts}
        resultPorts={node.resultPorts}
      />
      <MachineNodeWidgetControls
        isSelected={node.isSelected()}
        machineNames={node.machineCategory.machineNames}
        selectedMachineName={node.machineName}
        recipes={node.recipes}
        selectedRecipe={node.selectedRecipe}
        onSelectMachine={handleSelectMachine}
        onSelectRecipe={handleSelectRecipe}
      />
    </>
  );
};
