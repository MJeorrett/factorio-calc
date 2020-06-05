import createEngine, { DefaultDiagramState, DiagramModel } from '@projectstorm/react-diagrams';

import { MachineNodeFactory, MachineNodeModel } from './components';

export const diagramEngine = createEngine();

const state = diagramEngine.getStateMachine().getCurrentState();

if (state instanceof DefaultDiagramState) {
  state.dragNewLink.config.allowLooseLinks = false;
}
else {
  throw new Error('Expected state to be and instance of DefaultDiagramState.');
}

const nodeFactories = diagramEngine.getNodeFactories();
nodeFactories.registerFactory(new MachineNodeFactory());

const node = new MachineNodeModel({
  machineName: 'assemly-machine-1',
});

node.setPosition(100, 100);

const model = new DiagramModel();
model.addNode(node);

diagramEngine.setModel(model);
