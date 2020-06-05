import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@material-ui/core';

import { getIconCoordinates } from '../data';

const horizontalTileCount = 15;
const verticalTileCount = 16;
const tileSize = 32;

type SRootProps = {
  iconX: number,
  iconY: number,
  imageWidth: number,
  imageHeight: number,
  size: number,
};

type SPlaceholderProps = {
  size: number,
};

const S = {
  Root: styled.img<SRootProps>`
    background: url("images/sprite-sheet.png") ${p => `${p.iconX}px ${p.iconY}px`};
    background-size: ${p => `${p.imageWidth}px ${p.imageHeight}px`};
    height: ${p => p.size}px;
    width: ${p => p.size}px;
  `,
  Placeholder: styled.span<SPlaceholderProps>`
    border: 1px solid grey;
    height: ${p => p.size}px;
    padding: 3px;
    text-align: center;
    width: ${p => p.size}px;
  `,
};

type IconProps = {
  itemOrRecipeName: string,
  size?: number,
  tooltipText?: string,
  tooltipPlacement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top',
};

export const Icon: React.SFC<IconProps> = ({
  itemOrRecipeName,
  size = 32,
  tooltipText = '',
  tooltipPlacement = 'top',
}) => {
  if (!itemOrRecipeName) {
    return (
      <Tooltip title={tooltipText} placement={tooltipPlacement}>
        <S.Placeholder size={size}>
          ?
        </S.Placeholder>
      </Tooltip>
    );
  }

  const iconCoordinates = getIconCoordinates(itemOrRecipeName);

  const scale = size / tileSize;
  const imageHeight = (verticalTileCount * tileSize) * scale;
  const imageWidth = (horizontalTileCount * tileSize) * scale;
  const iconX = iconCoordinates.col * (-32 * scale);
  const iconY = iconCoordinates.row * (-32 * (size / 32));

  return (
    <Tooltip title={tooltipText} placement={tooltipPlacement}>
      <S.Root
        draggable="false"
        src="images/pixel.gif"
        size={size}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        iconX={iconX}
        iconY={iconY}
      />
    </Tooltip>
  );
};
