import React from 'react';
import styled from '@emotion/styled';

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
  ControlDropdown: styled.select<SControlDropdownProps>`
    display: block;
    width: 100%;
  `,
};

type MachineNodeWidgetProps = {
  isSelected: boolean,
  machineNames: string[],
  selectedMachineName: string,
  recipes: MachineRecipe[],
  selectedRecipe: Recipe | null,
  onSelectMachine: (event: React.FormEvent) => void,
  onSelectRecipe: (event: React.FormEvent) => void,
};

export const MachineNodeWidgetControls: React.SFC<MachineNodeWidgetProps> = ({
  isSelected,
  machineNames,
  selectedMachineName,
  recipes,
  selectedRecipe,
  onSelectMachine,
  onSelectRecipe,
}) => {
  return (
    <S.Root isOpen={isSelected}>
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
