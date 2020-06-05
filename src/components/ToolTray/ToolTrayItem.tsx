import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@material-ui/core';

import { getLabel, MachineCategory } from '../../data';

import { Icon } from '../Icon';
import { dataTransferKey } from '../Canvas';

const S = {
  TrayItem: styled.div`
    border: 1px solid darkolivegreen;
    border-radius: 2px;
    cursor: pointer;
    padding: 0.5rem;
    flex-shrink: 1;
  `,
};

type ToolTrayItemProps = {
  machineCategory: MachineCategory,
}

export const ToolTrayItem: React.SFC<ToolTrayItemProps> = ({
  machineCategory,
}) => {
  const handleDragStart: React.DragEventHandler = event => {
    event.dataTransfer.setData(dataTransferKey, machineCategory.defaultMachine);
  };

  return (
    <Tooltip title={machineCategory.label}>
      <S.TrayItem
        draggable={true}
        onDragStart={handleDragStart}
      >
        <Icon itemOrRecipeName={machineCategory.defaultMachine} />
      </S.TrayItem>
    </Tooltip>
  );
};
