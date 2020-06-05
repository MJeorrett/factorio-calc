import React from 'react';
import styled from '@emotion/styled';

import { Icon } from './Icon';

const color = 'darkolivegreen';
const hoverBackground = '#f3f3f3';

type SRootProps = {
  isSelected: boolean,
};

const S = {
  Root: styled.div<SRootProps>`
    background: white;
    border: 1px solid ${color};
    border-radius: 2px;
    border-width: ${p => p.isSelected ? '2px' : '1px'};
    opacity: 0.95;
    :hover {
      background: ${hoverBackground};
    }
  `,
  Title: styled.h4`
    padding: 0.25em;
    text-align: center;
  `,
};

type MachineWidgetBaseProps = {
  iconName: string,
  isSelected: boolean,
  tooltipText: string,
};

export const MachineWidgetBase: React.SFC<MachineWidgetBaseProps> = ({
  children,
  iconName,
  isSelected,
  tooltipText,
}) => {
  return (
    <S.Root isSelected={isSelected}>
      <S.Title>
        <Icon
          itemOrRecipeName={iconName}
          tooltipText={tooltipText}
        />
      </S.Title>
      {children}
    </S.Root>
  );
};
