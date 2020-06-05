import React from 'react';
import styled from '@emotion/styled';

import { machineCategories } from '../../data';
import { ToolTrayItem } from './ToolTrayItem';

const S = {
  Root: styled.div`
    background: white;
    border-right: 1px solid darkolivegreen;
    height: 100vh;
    left: 0;
    opacity: 0.95;
    overflow-y: auto;
    padding: 1rem;
    position: absolute;
    top: 0;
    & > *:not(:last-child) {
      margin-bottom: 1rem;
    }
  `,
};

export const ToolTray: React.SFC = () => {
  return (
    <S.Root>
      {machineCategories.map(machineCategory => (
        <ToolTrayItem
          key={machineCategory.name}
          machineCategory={machineCategory}
        />
      ))}
    </S.Root>
  );
};
