import React from 'react';
import styled from '@emotion/styled';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { Tooltip } from '@material-ui/core';

import { getLabel } from '../../data';

import { Icon } from '../Icon';
import { MachinePortModel } from './MachinePortModel';

const portSize = '12px';
const portColor = 'darkolivegreen';

type SPortProps = {
  isConnected: boolean;
  isIngredient: boolean;
};

const S = {
  Root: styled.div`
    display: flex;
    padding: 3px;
    & > *:not(:last-child) {
      margin-right: 0.5em;
    }
  `,
  PortWidget: styled(PortWidget)<SPortProps>`
    align-self: center;
    background: ${p => p.isConnected ? portColor: 'white'};
    border: 1px solid ${portColor};
    border-radius: calc(${portSize} / 2);
    cursor: ${p => p.isIngredient ? 'inherit' : 'pointer'};
    display: inline-block;
    height: ${portSize};
    width: ${portSize};
    :hover {
      background: ${p => p.isIngredient ? 'white' : portColor};
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
    links,
  }
}) => {
  const renderIcon = () => (
    <Icon
      itemOrRecipeName={itemName}
      size={25}
      tooltipText={itemName}
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
        isIngredient={isIngredient}
      />
      {isIngredient && renderIcon()}
    </S.Root>
  );
};
