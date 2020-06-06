import React, { useState } from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import { getLabel, Recipe, MachineCategory, MachineRecipe } from '../../data';
import { MachineWidgetBase } from '../MachineWidgetBase';

import { MachinePortWidget } from './MachinePortWidget';
import { MachinePortModel } from './MachinePortModel';

type SControlsProps = {
  isOpen: boolean,
};

type SControlDropdownProps = {
  isOpen: boolean;
};

const S = {
  Root: styled.div`
  `,
  Ports: styled.div`
    border-top: 1px solid darkolivegreen;
    display: flex;
    padding: 0.25rem;
  `,
  Controls: styled.div<SControlsProps>`
    background: #eeffdd;
    border-radius: 2px;
    padding: ${p => p.isOpen ? '0.5em' : 0};
    transform: scaleY(${p => p.isOpen ? 1 : 0});
    transform-origin: top;
    transition: all 0.2s ease-out;
    width: ${p => p.isOpen ? '100%' : 0};
    height: ${p => p.isOpen ? 'auto': 0};
    & > *:not(:last-child) {
      margin-bottom: 0.5em;
    }
  `,
  ControlDropdown: styled.select<SControlDropdownProps>`
    display: block;
    width: 100%;
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
  const handleTypeSelect = (event: React.FormEvent) => {
    const selectElement = event.target as HTMLSelectElement;
    setMachineName(selectElement.value);
    engine.repaintCanvas();
  };

  const handleRecipeSelect = (event: React.FormEvent) => {
    const selectElement = event.target as HTMLSelectElement;
    setSelectedRecipeName(selectElement.value);
    engine.repaintCanvas();
  }

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
      <S.Controls isOpen={isSelected}>
        <S.ControlDropdown isOpen={isSelected} value={machineName} onChange={handleTypeSelect}>
          {machineCategory.machineNames.map(machineName => (
            <option key={machineName} value={machineName}>{getLabel(machineName)}</option>
          ))}
        </S.ControlDropdown>
        <S.ControlDropdown isOpen={isSelected} value={selectedRecipe ? selectedRecipe.name : ''} onChange={handleRecipeSelect}>
          <option value="">-- Select Recipe --</option>
          {recipes.map(recipe => (
            <option key={recipe.name} value={recipe.name}>{recipe.label}</option>
          ))}
        </S.ControlDropdown>
      </S.Controls>
    </S.Root>
  );
}, (prev, next) => {
  return (
    prev.isSelected === next.isSelected &&
    prev.selectedRecipe === next.selectedRecipe &&
    prev.machineName === next.machineName
  );
});
