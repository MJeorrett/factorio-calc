import React from 'react';
import styled from '@emotion/styled';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';

import { getLabel } from '../../data';
import { Icon } from '../Icon';
import { MachinePortModel } from './MachinePortModel';

const portSize = '12px';
const portColor = 'darkolivegreen';

type SPortWidgetProps = {
  isConnected: boolean;
  satisfaction: number;
  isResource: boolean;
};

const S = {
  Root: styled.div`
    display: flex;
    padding: 3px;
    & > *:not(:last-child) {
      margin-right: 0.5em;
    }
  `,
  PortWidget: styled(PortWidget)<SPortWidgetProps>`
    align-self: center;
    background: ${p => !p.isConnected ?
      'white' :
      p.satisfaction === 0 ?
        'red' :
          p.satisfaction < 1 ?
          'orange' :
          portColor};
    border: 1px solid ${portColor};
    border-color: ${p => p.satisfaction === 0 ?
      'red' :
      p.satisfaction < 1 ?
        'orange' :
        portColor};
    border-radius: calc(${portSize} / 2);
    cursor: pointer;
    display: ${p => p.isResource ? 'none' : 'inline-block'};
    height: ${portSize};
    width: ${portSize};
    :hover {
      background: ${portColor};
    }
  `,
};

type MachinePortWidgetProps = {
  engine: DiagramEngine
  port: MachinePortModel,
};

export const MachinePortWidget: React.SFC<MachinePortWidgetProps> = ({
  engine,
  port,
  port: {
    itemName,
    isIngredient,
    isResource,
    links,
    itemsPerSecond,
    satisfaction,
  }
}) => {
  const renderIcon = () => (
    <Icon
      itemOrRecipeName={itemName}
      size={25}
      tooltipText={`${getLabel(itemName)} @ ${itemsPerSecond} \\s`}
      tooltipPlacement={isIngredient ? 'left' : 'right'}
    />
  );
  return (
    <S.Root>
      {!isIngredient && renderIcon()}
      <S.PortWidget
        key={port.getName()}
        port={port}
        engine={engine}
        isConnected={Object.keys(links).length > 0}
        isResource={isResource}
        satisfaction={isIngredient ? satisfaction : 1}
      />
      {isIngredient && renderIcon()}
    </S.Root>
  );
};
