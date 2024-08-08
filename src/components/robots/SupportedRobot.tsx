import { Suspense, useCallback, useRef } from "react"

import { UniversalRobots_UR3 } from "./UniversalRobots_UR3"
import { UniversalRobots_UR3e } from "./UniversalRobots_UR3e"
import { UniversalRobots_UR5 } from "./UniversalRobots_UR5"
import { UniversalRobots_UR5e } from "./UniversalRobots_UR5e"
import { UniversalRobots_UR10 } from "./UniversalRobots_UR10"
import { UniversalRobots_UR10e } from "./UniversalRobots_UR10e"
import { Yaskawa_AR900 } from "./Yaskawa_AR900"
import { Yaskawa_AR1440 } from "./Yaskawa_AR1440"
import { Yaskawa_AR1730 } from "./Yaskawa_AR1730"
import { Yaskawa_AR2010 } from "./Yaskawa_AR2010"
import { Yaskawa_AR3120 } from "./Yaskawa_AR3120"
import { FANUC_CRX10iA } from "./FANUC_CRX10iA"
import { FANUC_CRX25iA } from "./FANUC_CRX25iA"
import { FANUC_CRX25iAL } from "./FANUC_CRX25iAL"
import { KUKA_KR210_R2700 } from "./KUKA_KR210_R2700"
import { KUKA_KR270_R2700 } from "./KUKA_KR270_R2700"
import { FANUC_ARC_Mate_100iD } from "./FANUC_ARC_Mate_100iD"
import { FANUC_ARC_Mate_120iD } from "./FANUC_ARC_Mate_120iD"
import { ABB_1200_07_7 } from "./ABB_1200_07_7"

import type { GroupProps } from "@react-three/fiber"
import type {
  MotionGroupStateResponse,
  DHParameter,
} from "@wandelbots/wandelbots-api-client"
import { DHRobot } from "./DHRobot"

import * as THREE from "three"

export type DHRobotProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  dhParameters: Array<DHParameter>
} & GroupProps

export type RobotProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  modelURL: string
} & GroupProps

export type SupportedRobotProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  modelFromController: string
  dhParameters: DHParameter[]
  getModel?: (modelFromController: string) => string
  isGhost?: boolean
} & GroupProps

export function defaultGetModel(modelFromController: string): string {
  return `https://cdn.jsdelivr.net/gh/wandelbotsgmbh/wandelbots-js-react-components/public/models/${modelFromController}.glb`
}

export function SupportedRobot({
  rapidlyChangingMotionState,
  modelFromController,
  dhParameters,
  getModel = defaultGetModel,
  isGhost = false,
  ...props
}: SupportedRobotProps) {
  let Robot

  const robotRef = useRef<THREE.Group>(new THREE.Group())

  const setRobotRef = useCallback(
    (instance: THREE.Group | null) => {
      if (instance !== null) {
        robotRef.current = instance
        if (
          isGhost &&
          robotRef.current &&
          robotRef.current.children.length > 0
        ) {
          if (!robotRef.current.userData.ghostsCreated) {
            robotRef.current.traverse((obj) => {
              if (obj instanceof THREE.Mesh && !obj.userData.isGhost) {
                // Create a clone of the mesh
                const ghost = obj.clone()

                obj.material = new THREE.MeshStandardMaterial({
                  depthTest: true,
                  depthWrite: true,
                  colorWrite: false,
                  polygonOffset: true,
                  polygonOffsetFactor: 1,
                  color: "#ffffff",
                })

                // Set the material for the ghost mesh
                ghost.material = new THREE.MeshStandardMaterial({
                  color: "#D91433",
                  opacity: 0.3,
                  depthTest: true,
                  depthWrite: false,
                  transparent: true,
                  polygonOffset: true,
                  polygonOffsetFactor: -1,
                })
                ghost.userData.isGhost = true

                if (obj.parent) {
                  obj.parent.add(ghost)
                }
              }
            })
            robotRef.current.userData.ghostsCreated = true
          }
        }
      }
    },
    [isGhost],
  )

  switch (modelFromController) {
    case "UniversalRobots_UR3":
      Robot = UniversalRobots_UR3
      break
    case "UniversalRobots_UR3e":
      Robot = UniversalRobots_UR3e
      break
    case "UniversalRobots_UR5":
      Robot = UniversalRobots_UR5
      break
    case "UniversalRobots_UR5e":
      Robot = UniversalRobots_UR5e
      break
    case "UniversalRobots_UR10":
      Robot = UniversalRobots_UR10
      break
    case "UniversalRobots_UR10e":
      Robot = UniversalRobots_UR10e
      break
    case "Yaskawa_AR900":
      Robot = Yaskawa_AR900
      break
    case "Yaskawa_GP7":
      Robot = Yaskawa_AR900
      break
    case "Yaskawa_AR1440":
      Robot = Yaskawa_AR1440
      break
    case "Yaskawa_AR1730":
      Robot = Yaskawa_AR1730
      break
    case "Yaskawa_AR2010":
      Robot = Yaskawa_AR2010
      break
    case "Yaskawa_AR3120":
      Robot = Yaskawa_AR3120
      break
    case "FANUC_CRX10iA":
      Robot = FANUC_CRX10iA
      break
    case "FANUC_CRX25iA":
      Robot = FANUC_CRX25iA
      break
    case "FANUC_CRX25iAL":
      Robot = FANUC_CRX25iAL
      break
    case "FANUC_ARC_Mate_120iD":
      Robot = FANUC_ARC_Mate_120iD
      break
    case "FANUC_ARC_Mate_120iD35":
      Robot = FANUC_ARC_Mate_120iD
      break
    case "FANUC_ARC_Mate_100iD":
      Robot = FANUC_ARC_Mate_100iD
      break
    case "KUKA_KR210_R2700":
      Robot = KUKA_KR210_R2700
      break
    case "KUKA_KR270_R2700":
      Robot = KUKA_KR270_R2700
      break
    case "ABB_1200_07_7":
      Robot = ABB_1200_07_7
      break
    default:
      console.warn(`Unknown robot type: ${modelFromController}`)
      Robot = DHRobot
  }

  return (
    <Suspense
      fallback={
        <DHRobot
          rapidlyChangingMotionState={rapidlyChangingMotionState}
          dhParameters={dhParameters}
          {...props}
        />
      }
    >
      <group ref={setRobotRef}>
        <Robot
          rapidlyChangingMotionState={rapidlyChangingMotionState}
          modelURL={getModel(modelFromController)}
          dhParameters={dhParameters}
          {...props}
        />
      </group>
    </Suspense>
  )
}
