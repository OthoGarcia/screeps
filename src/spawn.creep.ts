import { RoleEnum } from "utils/Enum";
export class SpawnCreep {
    run() {
        const reduceInitialValue = [
            {role: RoleEnum.HARVESTER, value: 0},
            {role: RoleEnum.BUILDER, value: 0},
            {role: RoleEnum.UPGRADER, value: 0}
        ]
        const [
            harvestCreepsQuantity,
            builderCreepsQuantity,
            upgraderCreepsQuantity
        ] = _.reduce(Game.creeps, (acc, creep) => {
            const role = Memory.creeps[creep.name].role
            return acc.map((item) => {
                if (item.role === role)
                    item.value++
                return item
            })
        }, reduceInitialValue);

        if(harvestCreepsQuantity.value < 2) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: RoleEnum.HARVESTER}});
        }
        if(upgraderCreepsQuantity.value < 1) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: RoleEnum.UPGRADER}});
        }
        if(builderCreepsQuantity.value < 1) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: RoleEnum.BUILDER}});
        }
    }
}
