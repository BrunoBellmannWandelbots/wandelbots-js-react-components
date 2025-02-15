/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import type { GLTF } from "three-stdlib"
import type { RobotModelProps } from "./types"

type GLTFResult = GLTF & {
  nodes: {
    shape002: THREE.Mesh
    shape002_1: THREE.Mesh
    link_6: THREE.Mesh
    link_5: THREE.Mesh
    shape010: THREE.Mesh
    shape010_1: THREE.Mesh
    link_3: THREE.Mesh
    link_2: THREE.Mesh
    link_1: THREE.Mesh
  }
  materials: {
    fanuc_metal_black_AO: THREE.MeshStandardMaterial
    fanuc_stainless_steel_AO: THREE.MeshStandardMaterial
    fanuc_yellow_AO: THREE.MeshPhysicalMaterial
    fanuc_aluminium_black_AO: THREE.MeshStandardMaterial
  }
}

export function FANUC_LRMATE_200ID({ modelURL, ...props }: RobotModelProps) {
  const { nodes, materials } = useGLTF(modelURL) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group name="Empty">
        <group name="link_0">
          <mesh
            name="shape002"
            castShadow
            receiveShadow
            geometry={nodes.shape002.geometry}
            material={materials.fanuc_metal_black_AO}
          />
          <mesh
            name="shape002_1"
            castShadow
            receiveShadow
            geometry={nodes.shape002_1.geometry}
            material={materials.fanuc_stainless_steel_AO}
          />
        </group>
        <animated.group name="FANUC_LRMATE-200ID_J00">
          <animated.group
            name="FANUC_LRMATE-200ID_J01"
            position={[0.05, 0, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
          >
            <animated.group
              name="FANUC_LRMATE-200ID_J02"
              position={[0.33, 0, 0]}
            >
              <animated.group
                name="FANUC_LRMATE-200ID_J03"
                position={[0.035, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <animated.group
                  name="FANUC_LRMATE-200ID_J04"
                  position={[0, -0.335, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="FANUC_LRMATE-200ID_J05"
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <group
                      name="FANUC_LRMATE-200ID_FLG"
                      position={[0, -0.08, 0]}
                      rotation={[-Math.PI, 0, 0]}
                    />
                    <mesh
                      name="link_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.link_6.geometry}
                      material={materials.fanuc_metal_black_AO}
                      position={[-0.365, 0.385, 0]}
                      rotation={[0, 0, -Math.PI / 2]}
                    />
                  </animated.group>
                  <mesh
                    name="link_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.link_5.geometry}
                    material={materials.fanuc_yellow_AO}
                    position={[-0.365, 0, -0.385]}
                    rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  />
                </animated.group>
                <group
                  name="link_4"
                  position={[-0.365, 0.05, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="shape010"
                    castShadow
                    receiveShadow
                    geometry={nodes.shape010.geometry}
                    material={materials.fanuc_yellow_AO}
                  />
                  <mesh
                    name="shape010_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.shape010_1.geometry}
                    material={materials.fanuc_aluminium_black_AO}
                  />
                </group>
              </animated.group>
              <mesh
                name="link_3"
                castShadow
                receiveShadow
                geometry={nodes.link_3.geometry}
                material={materials.fanuc_yellow_AO}
                position={[-0.33, 0, -0.05]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              />
            </animated.group>
            <mesh
              name="link_2"
              castShadow
              receiveShadow
              geometry={nodes.link_2.geometry}
              material={materials.fanuc_yellow_AO}
              position={[0, 0, -0.05]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            />
          </animated.group>
          <mesh
            name="link_1"
            castShadow
            receiveShadow
            geometry={nodes.link_1.geometry}
            material={materials.fanuc_yellow_AO}
          />
        </animated.group>
      </group>
    </group>
  )
}
