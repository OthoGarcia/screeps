import { RoleEnum } from "utils/Enum";
import { ErrorMapper } from "utils/ErrorMapper";
import { RoleBuilder } from "role.builder"
import { RoleHarvester } from "role.harvester"
import { RoleUpgrader } from "role.upgrader"
import { SpawnCreep } from "spawn.creep";
declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role?: RoleEnum;
    room?: string;
    working?: boolean;
    upgrading?: boolean;
    building?: boolean;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  // var tower = Game.getObjectById('89cdd59da94cef102786cbbb');
  // if(tower) {
  //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  //         filter: (structure) => structure.hits < structure.hitsMax
  //     });
  //     if(closestDamagedStructure) {
  //         tower.repair(closestDamagedStructure);
  //     }

  //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //     if(closestHostile) {
  //         tower.attack(closestHostile);
  //     }
  // }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
  const spawn = new SpawnCreep()
  spawn.run()
  const roleHarvester = new RoleHarvester()
  const roleBuilder = new RoleBuilder()
  const roleUpgrader = new RoleUpgrader()
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == RoleEnum.HARVESTER) {
        roleHarvester.run(creep);
    }
    if(creep.memory.role == RoleEnum.UPGRADER) {
        roleUpgrader.run(creep);
    }
    if(creep.memory.role == RoleEnum.BUILDER) {
        roleBuilder.run(creep);
    }
  }
});
