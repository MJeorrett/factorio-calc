import React, { useState } from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import { getLabel } from '../../data';
import { MachineWidgetBase } from '../MachineWidgetBase';

import { MachineNodeModel } from './MachineNodeModel';
import { MachinePortWidget } from './MachinePortWidget';

type SControlsProps = {
  isOpen: boolean,
};

const S = {
  Root: styled.div``,
  Ports: styled.div`
    border-top: 1px solid darkolivegreen;
    display: flex;
    padding: 0.25rem;
  `,
  Controls: styled.div<SControlsProps>`
    background: #eeffdd;
    border-radius: 2px;
    padding: 0.5em;
    transform: scaleY(${p => p.isOpen ? 1 : 0});
    transform-origin: top;
    transition: all 0.2s ease-out;
    & > *:not(:last-child) {
      margin-bottom: 0.5em;
    }
  `,
  ControlDropdown: styled.select`
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
  node: MachineNodeModel,
};

export const MachineNodeWidget: React.SFC<MachineNodeWidgetProps> = ({
  engine,
  node,
}) => {
  const handleTypeSelect = (event: React.FormEvent) => {
    const selectElement = event.target as HTMLSelectElement;
    node.machineName = selectElement.value;
    engine.repaintCanvas();
  };

  const handleRecipeSelect = (event: React.FormEvent) => {
    const selectElement = event.target as HTMLSelectElement;
    node.setSelectedRecipeName(selectElement.value);
    engine.repaintCanvas();
  }

  return (
    <S.Root>
      <MachineWidgetBase
        iconName={node.machineName}
        isSelected={node.isSelected()}
        tooltipText={getLabel(node.machineName)}
      >
        {Object.keys(node.getPorts()).length > 0 && (
          <S.Ports>
            <S.IngredientPorts>
              {node.ingredientPorts.map(port => (
                <MachinePortWidget key={port.getName()} engine={engine} port={port} />
              ))}
            </S.IngredientPorts>
            <S.PortsSpacer />
            <S.ResultPorts>
              {node.resultPorts.map(port => (
                <MachinePortWidget key={port.getName()} engine={engine} port={port} />
              ))}
            </S.ResultPorts>
          </S.Ports>
        )}
      </MachineWidgetBase>
      <S.Controls isOpen={node.isSelected()}>
        <S.ControlDropdown value={node.machineName} onChange={handleTypeSelect}>
          {node.machineCategory.machineNames.map(machineName => (
            <option key={machineName} value={machineName}>{getLabel(machineName)}</option>
          ))}
        </S.ControlDropdown>
        <S.ControlDropdown value={node.selectedRecipe ? node.selectedRecipe.name : ''} onChange={handleRecipeSelect}>
          <option value="">-- Select Recipe --</option>
          {node.recipes.map(recipe => (
            <option key={recipe.name} value={recipe.name}>{recipe.label}</option>
          ))}
        </S.ControlDropdown>
      </S.Controls>
    </S.Root>
  );
};
