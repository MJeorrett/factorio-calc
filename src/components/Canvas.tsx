import React from 'react';
import styled from '@emotion/styled';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';

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

export const Canvas = ({
  engine,
}: CanvasProps) => {
  return (
    <S.Root>
      <S.Canvas engine={engine} />
    </S.Root>
  );
};
