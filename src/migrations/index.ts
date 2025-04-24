import * as migration_20250404_194237_initial from './20250404_194237_initial';
import * as migration_20250424_025939 from './20250424_025939';

export const migrations = [
  {
    up: migration_20250404_194237_initial.up,
    down: migration_20250404_194237_initial.down,
    name: '20250404_194237_initial',
  },
  {
    up: migration_20250424_025939.up,
    down: migration_20250424_025939.down,
    name: '20250424_025939'
  },
];
