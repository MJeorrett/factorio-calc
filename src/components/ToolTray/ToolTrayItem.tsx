import React from 'react';

import { MachineCategory } from '../../data';

import { dataTransferKey } from '../Canvas';
import { MachineWidgetBase } from '../MachineWidgetBase';

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
    <div
      draggable={true}
      onDragStart={handleDragStart}
      style={{ cursor: 'pointer' }}
    >
      <MachineWidgetBase
        iconName={machineCategory.defaultMachine}
        isSelected={false}
        tooltipText={machineCategory.label}
      />
    </div>
  );
};
