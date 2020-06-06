import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import {  Recipe, MachineCategory, MachineRecipe } from '../../data';
import { MachineWidgetBase } from '../MachineWidgetBase';

import { MachinePortWidget } from './MachinePortWidget';
import { MachinePortModel } from './MachinePortModel';
import { MachineNodeWidgetControls } from './MachineNodeWidgetControls';

const S = {
  Root: styled.div`
  `,
  Ports: styled.div`
    border-top: 1px solid darkolivegreen;
    display: flex;
    padding: 0.25rem;
  `,
  IngredientPorts: styled.div``,
  PortsSpacer: styled.div`
    flex-grow: 1;
    min-width: 0.5em;
  `,
  ResultPorts: styled.div``,
};

type MachineNodeWidgetProps = {
  engine: DiagramEngine,
  recipes: MachineRecipe[],
  selectedRecipe: Recipe | null,
  isSelected: boolean,
  machineName: string,
  label: string,
  machineCategory: MachineCategory,
  ingredientPorts: MachinePortModel[],
  resultPorts: MachinePortModel[],
  setMachineName: (machineName: string) => void,
  setSelectedRecipeName: (recipeName: string) => void,
};

export const MachineNodeWidget: React.SFC<MachineNodeWidgetProps> = React.memo(({
  engine,
  isSelected,
  machineName,
  machineCategory,
  label,
  recipes,
  selectedRecipe,
  ingredientPorts,
  resultPorts,
  setMachineName,
  setSelectedRecipeName,
}) => {
  const anyPorts = ingredientPorts.length + resultPorts.length > 0;

  return (
    <S.Root>
      <MachineWidgetBase
        iconName={machineName}
        isSelected={isSelected}
        tooltipText={label}
      >
        {anyPorts && (
          <S.Ports>
            <S.IngredientPorts>
              {ingredientPorts.map(port => (
                <MachinePortWidget key={port.getName()} engine={engine} port={port} />
              ))}
            </S.IngredientPorts>
            <S.PortsSpacer />
            <S.ResultPorts>
              {resultPorts.map(port => (
                <MachinePortWidget key={port.getName()} engine={engine} port={port} />
              ))}
            </S.ResultPorts>
          </S.Ports>
        )}
      </MachineWidgetBase>
      <MachineNodeWidgetControls
        engine={engine}
        isSelected={isSelected}
        machineNames={machineCategory.machineNames}
        selectedMachineName={machineName}
        recipes={recipes}
        selectedRecipe={selectedRecipe}
        setMachineName={setMachineName}
        setSelectedRecipeName={setSelectedRecipeName}
      />
    </S.Root>
  );
}, (prev, next) => {
  return (
    prev.isSelected === next.isSelected &&
    prev.selectedRecipe === next.selectedRecipe &&
    prev.machineName === next.machineName
  );
});
