import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import { animated } from "@react-spring/three"
import RobotAnimator from "./RobotAnimator"

export function FANUC_CRX25iAL({
  modelURL,
  rapidlyChangingMotionState,
  ...props
}: RobotProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials
  const rotationOffsets = [0, Math.PI / 2, 0, 0, 0, 0]

  function setRotation(jointObjects: THREE.Object3D[], jointValues: number[]) {
    jointObjects.forEach(
      (object, index) =>
        (object.rotation.y = jointValues[index]! + rotationOffsets[index]!),
    )
  }

  return (
    <>
      <RobotAnimator
        rapidlyChangingMotionState={rapidlyChangingMotionState}
        robotRootObjectName="Scene"
        onRotationChanged={setRotation}
      />
      <group {...props} dispose={null}>
        <group name="Scene">
          <animated.group name="CRX10iA_J00">
            <animated.group
              name="CRX10iA_J01"
              position={[0, 0.245, 0]}
              rotation={[Math.PI / 2, Math.PI / 2, 0]}
            >
              <animated.group name="CRX10iA_J02" position={[0.71, 0, 0]}>
                <animated.group
                  name="CRX10iA_J03"
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="CRX10iA_J04"
                    position={[0, -0.54, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="CRX10iA_J05"
                      position={[0, 0.15, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <group
                        name="CRX10iA_FLG"
                        position={[0, -0.16, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <mesh
                        name="CRX10iA_L06"
                        castShadow
                        receiveShadow
                        geometry={nodes.CRX10iA_L06.geometry}
                        material={materials["Fanuc_BlackMetal.001"]}
                        position={[0, -0.16, 0]}
                        rotation={[0, 0, -Math.PI / 2]}
                      />
                    </animated.group>
                    <group
                      name="CRX10iA_L05"
                      position={[0, 0.15, 0]}
                      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                    >
                      <mesh
                        name="J5CASING_UNIT001"
                        castShadow
                        receiveShadow
                        geometry={nodes.J5CASING_UNIT001.geometry}
                        material={materials["Fanuc_WhitePlastic.001"]}
                      />
                      <mesh
                        name="J5CASING_UNIT001_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.J5CASING_UNIT001_1.geometry}
                        material={materials["Fanuc_Green.001"]}
                      />
                    </group>
                  </animated.group>
                  <group
                    name="CRX10iA_L04"
                    position={[0, -0.54, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="NAME_LABEL_CRX_10iA_L001"
                      castShadow
                      receiveShadow
                      geometry={nodes.NAME_LABEL_CRX_10iA_L001.geometry}
                      material={materials["Fanuc_WhitePlastic.001"]}
                    />
                    <mesh
                      name="NAME_LABEL_CRX_10iA_L001_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.NAME_LABEL_CRX_10iA_L001_1.geometry}
                      material={materials["Fanuc_RedPlastic.001"]}
                    />
                    <mesh
                      name="NAME_LABEL_CRX_10iA_L001_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.NAME_LABEL_CRX_10iA_L001_2.geometry}
                      material={materials["Fanuc_BlackPlastic.001"]}
                    />
                  </group>
                </animated.group>
                <group
                  name="CRX10iA_L03"
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="J3CASING_UNIT001"
                    castShadow
                    receiveShadow
                    geometry={nodes.J3CASING_UNIT001.geometry}
                    material={materials["Fanuc_WhitePlastic.001"]}
                  />
                  <mesh
                    name="J3CASING_UNIT001_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.J3CASING_UNIT001_1.geometry}
                    material={materials["Fanuc_Green.001"]}
                  />
                </group>
              </animated.group>
              <mesh
                name="CRX10iA_L02"
                castShadow
                receiveShadow
                geometry={nodes.CRX10iA_L02.geometry}
                material={materials["Fanuc_WhitePlastic.001"]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              />
            </animated.group>
            <group name="CRX10iA_L01" position={[0, 0.128, 0]}>
              <mesh
                name="J2BASE_UNIT001"
                castShadow
                receiveShadow
                geometry={nodes.J2BASE_UNIT001.geometry}
                material={materials["Fanuc_WhitePlastic.001"]}
              />
              <mesh
                name="J2BASE_UNIT001_1"
                castShadow
                receiveShadow
                geometry={nodes.J2BASE_UNIT001_1.geometry}
                material={materials["Fanuc_Green.001"]}
              />
              <mesh
                name="J2BASE_UNIT001_2"
                castShadow
                receiveShadow
                geometry={nodes.J2BASE_UNIT001_2.geometry}
                material={materials["Fanuc_GreenLED.001"]}
              />
            </group>
          </animated.group>
          <mesh
            name="CRX10iA_L00"
            castShadow
            receiveShadow
            geometry={nodes.CRX10iA_L00.geometry}
            material={materials["Fanuc_BlackMetal.001"]}
          />
        </group>
      </group>
    </>
  )
}
