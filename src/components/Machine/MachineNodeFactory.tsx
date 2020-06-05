import React from 'react';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';

import { MachineNodeModel } from './MachineNodeModel';
import { MachineNodeWidget } from './MachineNodeWidget';
import { DiagramEngine } from '@projectstorm/react-diagrams';

export class MachineNodeFactory extends AbstractReactFactory<MachineNodeModel, DiagramEngine> {
  constructor() {
    super(MachineNodeModel.type)
  }

  generateReactWidget(event: GenerateWidgetEvent<MachineNodeModel>) {
    return (
      <MachineNodeWidget engine={this.engine} node={event.model} />
    );
  }

  generateModel() {
    console.log('Generate model called.');
    return new MachineNodeModel({ machineName: 'default' });
  }
}