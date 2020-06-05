import createEngine, { DefaultDiagramState, DiagramModel, DefaultNodeModel } from '@projectstorm/react-diagrams';

export const diagramEngine = createEngine();

const state = diagramEngine.getStateMachine().getCurrentState();

if (state instanceof DefaultDiagramState) {
  state.dragNewLink.config.allowLooseLinks = false;
}
else {
  throw new Error('Expected state to be and instance of DefaultDiagramState.');
}

const node = new DefaultNodeModel({
  name: 'test',
});

node.setPosition(100, 100);

const model = new DiagramModel();
model.addNode(node);

diagramEngine.setModel(model);
