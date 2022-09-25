import { RoleEnum } from "utils/Enum"

interface CreepMemory extends RoomMemory {
  building?: boolean
  upgrading?: boolean
  role?: RoleEnum
}
