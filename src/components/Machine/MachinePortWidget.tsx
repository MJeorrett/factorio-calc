import React from 'react';
import styled from '@emotion/styled';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';

import { MachinePortModel } from './MachinePortModel';

const portSize = '10px';

type SPort = {
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
  PortWidget: styled(PortWidget)<SPort>`
    align-self: center;
    background: dodgerblue;
    border-radius: calc(${portSize} / 2);
    cursor: pointer;
    display: inline-block;
    height: ${portSize};
    width: ${portSize};
    :hover {
      opacity: 0.6;
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
  }
}) => {
  return (
    <S.Root>
      {!isIngredient && (
        <p>{itemName}</p>
      )}
      <S.PortWidget
        key={port.getName()}
        port={port}
        engine={engine}
        isIngredient={isIngredient}
      />
      {isIngredient && (
        <p>{itemName}</p>
      )}
    </S.Root>
  );
};
