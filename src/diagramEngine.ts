import createEngine, { DefaultDiagramState, DiagramModel } from '@projectstorm/react-diagrams';

import { MachineNodeFactory } from './components';

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

const model = new DiagramModel();

diagramEngine.setModel(model);
