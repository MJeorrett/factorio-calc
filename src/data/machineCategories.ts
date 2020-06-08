import { MachineConfigKey } from "./itemsConfig";

export type MachineCategory = {
  name: (
    'assembling-machine' |
    'furnace' |
    'chemical-plant' |
    'oil-refinery' |
    'rocket-silo'
  ),
  label: string,
  configKey: MachineConfigKey,
  machineNames: string[],
  defaultMachine: string,
};

export const machineCategories: MachineCategory[] = [
  {
    name: 'assembling-machine',
    label: 'Assembling Machine',
    configKey: 'assembling-machine',
    machineNames: [
      'assembling-machine-1',
      'assembling-machine-2',
      'assembling-machine-3',
    ],
    defaultMachine: 'assembling-machine-3',
  },
  {
    name: 'oil-refinery',
    label: 'Oil Refinary',
    configKey: 'assembling-machine',
    machineNames: [
      'oil-refinery',
    ],
    defaultMachine: 'oil-refinery',
  },
  {
    name: 'chemical-plant',
    label: 'Chemical Plant',
    configKey: 'assembling-machine',
    machineNames: [
      'chemical-plant',
    ],
    defaultMachine: 'chemical-plant',
  },
  {
    name: 'furnace',
    label: 'Furnace',
    configKey: 'furnace',
    machineNames: [
      'stone-furnace',
      'steel-furnace',
      'electric-furnace',
    ],
    defaultMachine: 'electric-furnace',
  },
  {
    name: 'rocket-silo',
    label: 'Rocket Silo',
    configKey: 'rocket-silo',
    machineNames: [
      'rocket-silo',
    ],
    defaultMachine: 'rocket-silo',
  }
];

export const findCategoryForMachine = (machineName: string): MachineCategory => {
  const machineCategory = machineCategories.find(mc => mc.machineNames.includes(machineName));

  if (machineCategory === undefined) {
    throw new Error(`Could not find category for machine '${machineName}'.`);
  }

  return machineCategory;
};
