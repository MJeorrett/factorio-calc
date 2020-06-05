import React from 'react';
import styled from '@emotion/styled';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { MachineNodeModel } from './Machine';

export const dataTransferKey = 'machine-name';

const S = {
  Root: styled.div`
    height: 100vh;
  `,
  Canvas: styled(CanvasWidget)`
    height: 100%;
  `,
};

type CanvasProps = {
  engine: DiagramEngine,
};

export const Canvas: React.SFC<CanvasProps> = ({
  engine,
}) => {
  const handleDrop: React.DragEventHandler = event => {
    const machineName = event.dataTransfer.getData(dataTransferKey);
    const node = new MachineNodeModel(machineName);

    let mousePosition = engine.getRelativeMousePoint(event);
    node.setPosition(mousePosition);
    engine.getModel().clearSelection();
    node.setSelected(true);

    engine.getModel().addNode(node);
    engine.repaintCanvas();
  };

  return (
    <S.Root
      onDrop={handleDrop}
      onDragOver={event => event.preventDefault()}
    >
      <S.Canvas engine={engine} />
    </S.Root>
  );
};
