import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import { getLabel } from '../../data';

import { MachineNodeModel } from './MachineNodeModel';
import { MachinePortWidget } from './MachinePortWidget';
import { Icon } from '../Icon';

const color = 'darkolivegreen';
const hoverBackground = '#f3f3f3';

type SRootProps = {
  isSelected: boolean,
};

const S = {
  Root: styled.div<SRootProps>`
    background: white;
    border: 1px solid ${color};
    border-radius: 2px;
    border-width: ${p => p.isSelected ? '2px' : '1px'};
    opacity: 0.95;
    :hover {
      background: ${hoverBackground};
    }
  `,
  Title: styled.h4`
    border-bottom: 1px solid ${color};
    padding: 0.25em;
    text-align: center;
  `,
  Ports: styled.div`
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
  node: MachineNodeModel,
};

export const MachineNodeWidget: React.SFC<MachineNodeWidgetProps> = ({
  engine,
  node,
}) => {
  return (
    <S.Root isSelected={node.isSelected()}>
      <S.Title>
        <Icon
          itemOrRecipeName={node.machineName}
          tooltipText={getLabel(node.machineName)}
        />
      </S.Title>
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
    </S.Root>
  );
};
