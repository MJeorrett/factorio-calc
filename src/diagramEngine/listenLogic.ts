import { DiagramEngine } from "@projectstorm/react-diagrams";

const createHandleLinkEvent = (diagramEngine: DiagramEngine) => (event: any) => {
  const { entity: link } = event;
  const eventType = event.function;

  if (
    eventType !== 'targetPortChanged' &&
    eventType !== 'entityRemoved'
  ) {
    return;
  }

  if (!link.targetPort) return;

  link.sourcePort.updateLinks();
  link.targetPort.updateSatisfaction();
  
  diagramEngine.repaintCanvas();
}

export const startListening = (engine: DiagramEngine) => {
  engine.getModel().registerListener({
    linksUpdated: (event: any) => {
      if (event.isCreated) {
        event.link.registerListener({
          eventDidFire: createHandleLinkEvent(engine),
        });
      }
    },
  });
};