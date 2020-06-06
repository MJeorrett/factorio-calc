import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import {  Recipe } from '../../data';
import { MachineWidgetBase } from '../MachineWidgetBase';

import { MachinePortWidget } from './MachinePortWidget';
import { MachinePortModel } from './MachinePortModel';

const S = {
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
  selectedRecipe: Recipe | null,
  isSelected: boolean,
  machineName: string,
  label: string,
  ingredientPorts: MachinePortModel[],
  resultPorts: MachinePortModel[],
};

export const MachineNodeWidget: React.SFC<MachineNodeWidgetProps> = React.memo(({
  engine,
  isSelected,
  machineName,
  label,
  ingredientPorts,
  resultPorts,
}) => {
  const anyPorts = ingredientPorts.length + resultPorts.length > 0;

  return (
    <>
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
    </>
  );
}, (prev, next) => {
  return (
    prev.isSelected === next.isSelected &&
    prev.selectedRecipe === next.selectedRecipe &&
    prev.machineName === next.machineName
  );
});
