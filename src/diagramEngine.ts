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

const nodes = [
  new MachineNodeModel({
    machineName: 'assembling-machine-1',
  }),
  new MachineNodeModel({
    machineName: 'assembling-machine-2',
  }),
];

nodes[0].setPosition(100, 100);
nodes[1].setPosition(100, 300);

const model = new DiagramModel();
model.addNode(nodes[0]);
model.addNode(nodes[1]);

diagramEngine.setModel(model);
