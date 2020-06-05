import React from 'react';
import {  DiagramEngine } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import { MachineNodeModel } from './MachineNodeModel';
import { MachinePortWidget } from './MachinePortWidget';

type SRoot = {
  isSelected: boolean,
};

const S = {
  Root: styled.div<SRoot>`
    border: 1px solid dodgerblue;
    border-radius: 2px;
    border-width: ${p => p.isSelected ? '2px' : '1px'};
    cursor: pointer;
    :hover {
      background: #f3f3f3;
    }
  `,
  Title: styled.h4`
    border-bottom: 1px solid dodgerblue;
    padding: 0.5em;
    text-align: center;
  `,
  Ports: styled.div`
    display: flex;
    padding: 0.25rem;
  `,
  IngredientPorts: styled.div``,
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
  return (
    <S.Root isSelected={node.isSelected()}>
      <S.Title>
        {node.machineName}
      </S.Title>
      <S.Ports>
        <S.IngredientPorts>
          {node.ingredientPorts.map(port => (
            <MachinePortWidget key={port.getName()} engine={engine} port={port} />
          ))}
        </S.IngredientPorts>
        <S.ResultPorts>
          {node.resultPorts.map(port => (
            <MachinePortWidget key={port.getName()} engine={engine} port={port} />
          ))}
        </S.ResultPorts>
      </S.Ports>
    </S.Root>
  );
};
