import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@material-ui/core';

import { getLabel, Recipe, MachineRecipe } from '../../data';

type SControlsProps = {
  isOpen: boolean,
};

type SControlDropdownProps = {
  isOpen: boolean;
};

const S = {
  Root: styled.div<SControlsProps>`
    background: #eeffdd;
    border-radius: 2px;
    padding: ${p => p.isOpen ? '0.5em' : 0};
    transform: scaleY(${p => p.isOpen ? 1 : 0});
    transform-origin: top;
    transition: all 0.2s ease-out;
    width: ${p => p.isOpen ? '100%' : 0};
    height: ${p => p.isOpen ? 'auto' : 0};
    & > *:not(:last-child) {
      margin-bottom: 0.5em;
    }
  `,
  ControlButtonsSet: styled.div`
    & > *:not(:last-child) {
      margin-right: 3px;
    }
  `,
  ControlButton: styled.button`
    color: darkolivegreen;
    cursor: pointer;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 2px;
    padding: 3px;
    :hover:not(:disabled) {
      border-color: rgba(85, 107, 47, 1);
    }
    :disabled {
      cursor: inherit;
      opacity: 0.5;
    }
  `,
  ControlDropdown: styled.select<SControlDropdownProps>`
    display: block;
    width: 100%;
  `,
};

type MachineNodeWidgetProps = {
  isSelected: boolean,
  machineCount: number,
  machineNames: string[],
  selectedMachineName: string,
  recipes: MachineRecipe[],
  selectedRecipe: Recipe | null,
  onSelectMachine: (event: React.FormEvent) => void,
  onSelectRecipe: (event: React.FormEvent) => void,
  onSetMachineCount: (count: number) => void,
};

type ControlButtonProps = {
  machineCount: number,
  delta: number,
  children: string,
};

export const MachineNodeWidgetControls: React.SFC<MachineNodeWidgetProps> = ({
  isSelected,
  machineCount,
  machineNames,
  selectedMachineName,
  recipes,
  selectedRecipe,
  onSelectMachine,
  onSelectRecipe,
  onSetMachineCount,
}) => {
  const createHandleIcrementMachineCount = (n: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
    onSetMachineCount(machineCount + n);
  };

  const ControlButton: React.SFC<ControlButtonProps> = ({
    machineCount,
    delta,
    children,
  }) => {
    return (
      <Tooltip title={machineCount + delta} placement="top">
        <S.ControlButton
          type="button"
          disabled={delta < 0 && (delta * -1) >= machineCount}
          onClick={createHandleIcrementMachineCount(delta)}
        >
          {children}
        </S.ControlButton>
      </Tooltip>
    );
  };

  return (
    <S.Root isOpen={isSelected}>
      <div>
        <S.ControlButtonsSet>
          <ControlButton machineCount={machineCount} delta={1}>+1</ControlButton>
          <ControlButton machineCount={machineCount} delta={10}>+10</ControlButton>
          <ControlButton machineCount={machineCount} delta={100}>+100</ControlButton>
          <ControlButton machineCount={machineCount} delta={1000}>+1000</ControlButton>
        </S.ControlButtonsSet>
        <S.ControlButtonsSet>
          <ControlButton machineCount={machineCount} delta={-1}>-1</ControlButton>
          <ControlButton machineCount={machineCount} delta={-10}>-10</ControlButton>
          <ControlButton machineCount={machineCount} delta={-100}>-100</ControlButton>
          <ControlButton machineCount={machineCount} delta={-1000}>-1000</ControlButton>
        </S.ControlButtonsSet>
      </div>
      {machineNames.length > 1 && (
        <S.ControlDropdown isOpen={isSelected} value={selectedMachineName} onChange={onSelectMachine}>
          {machineNames.map(machineName => (
            <option key={machineName} value={machineName}>{getLabel(machineName)}</option>
          ))}
        </S.ControlDropdown>
      )}
      <S.ControlDropdown isOpen={isSelected} value={selectedRecipe ? selectedRecipe.name : ''} onChange={onSelectRecipe}>
        <option value="">-- Select Recipe --</option>
        {recipes.map(recipe => (
          <option key={recipe.name} value={recipe.name}>{recipe.label}</option>
        ))}
      </S.ControlDropdown>
    </S.Root>
  );
};
