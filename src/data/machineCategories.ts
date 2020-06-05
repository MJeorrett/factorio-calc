export type MachineCategory = {
  name: string,
  label: string,
  defaultMachine: string,
};

export const machineCategories: MachineCategory[] = [
  {
    name: 'assembling-machine',
    label: 'Assembling Machine',
    defaultMachine: 'assembling-machine-3',
  },
  {
    name: 'furnace',
    label: 'Furnace',
    defaultMachine: 'electric-furnace',
  },
];
