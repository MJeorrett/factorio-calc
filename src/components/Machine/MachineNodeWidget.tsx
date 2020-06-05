import React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import { getLabel } from '../../data';
import { MachineWidgetBase } from '../MachineWidgetBase';

import { MachineNodeModel } from './MachineNodeModel';
import { MachinePortWidget } from './MachinePortWidget';


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
  node: MachineNodeModel,
};

export const MachineNodeWidget: React.SFC<MachineNodeWidgetProps> = ({
  engine,
  node,
}) => {
  return (
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
  );
};
