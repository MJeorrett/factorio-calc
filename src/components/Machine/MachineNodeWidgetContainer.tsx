import React, { useMemo } from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';

import { getLabel } from '../../data';

import { MachineNodeModel } from './MachineNodeModel';
import { MachineNodeWidget } from './MachineNodeWidget';

type MachineNodeWidgetContainerProps = {
  engine: DiagramEngine,
  node: MachineNodeModel,
};

export const MachineNodeWidgetContainer: React.SFC<MachineNodeWidgetContainerProps> = ({
  engine,
  node,
}) => {
  const handleSelectMachine = useMemo(() => (event: React.FormEvent) => {
    const selectElement = event.target as HTMLSelectElement;
    node.setMachineName(selectElement.value);
    engine.repaintCanvas();
  }, []);

  const handleSelectRecipe = useMemo(() => (event: React.FormEvent) => {
    const selectElement = event.target as HTMLSelectElement;
    node.setSelectedRecipeName(selectElement.value);
    engine.repaintCanvas();
  }, []);

  return (
    <>
      <MachineNodeWidget
        engine={engine}
        portLinks={node.portLinks}
        isSelected={node.isSelected()}
        machineNames={node.machineCategory.machineNames}
        machineName={node.machineName}
        recipes={node.recipes}
        selectedRecipe={node.selectedRecipe}
        label={getLabel(node.machineName)}
        ingredientPorts={node.ingredientPorts}
        resultPorts={node.resultPorts}
        handleSelectMachine={handleSelectMachine}
        handleSelectRecipe={handleSelectRecipe}
      />
    </>
  );
};
