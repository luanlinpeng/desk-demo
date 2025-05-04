import { useGLTF, useTexture } from "@react-three/drei";
import textures from "../stores/detail";
import useConfigStore from "../stores/configStore";
import * as THREE from "three";
import { useMemo } from "react";


const useTextureWithSettings = (textureConfig) => {

    const textureProps = useTexture({
        map: textureConfig.texture.map,
    })

    textureProps.map.repeat.set(4, 4)

    textureProps.map.rotation = Math.PI / 2

    textureProps.map.wrapS = THREE.RepeatWrapping
    textureProps.map.wrapT = THREE.RepeatWrapping


    return textureProps
}


const Desk = () => {

    const { nodes, materials } = useGLTF(
        "/models/desk.glb"
    );

    const deskConfig = useConfigStore();


    const computedLengthRatio = useMemo(() => deskConfig.length / deskConfig.defaultLength, [deskConfig.length])
 
    const woodTextureProps = useTextureWithSettings(textures[deskConfig.topMaterial])

    return (
        <group dispose={null}>
            {/* 桌面 */}
            <mesh geometry={nodes.Top.geometry} scale={[computedLengthRatio, 1, 1]} position={nodes.Top.position}>
                <meshStandardMaterial {...woodTextureProps}
                    roughness={0.3}
                />
            </mesh>
            {/* 可调节桌腿 */}
            <mesh geometry={nodes.IStand1.geometry} scale={[1, 1, 1]} position={nodes.IStand1.position}
                visible={deskConfig.frameType !== "standard"}>
                <meshStandardMaterial
                    metalness={0.3}
                    roughness={0.1}
                    color={deskConfig.frameColor}
                />
            </mesh>
            <mesh geometry={nodes.IStand2.geometry} scale={[1, 1, 1]} position={nodes.IStand2.position}
                visible={deskConfig.frameType !== "standard"}>
                <meshStandardMaterial
                    metalness={0.3}
                    roughness={0.1}
                    color={deskConfig.frameColor}
                />
            </mesh>
            {/* 经典桌腿 */}
            <mesh geometry={nodes.ClassicStand1.geometry} scale={[1, 1, 1]} position={nodes.ClassicStand1.position}
                visible={deskConfig.frameType === "standard"}>
                <meshStandardMaterial
                    metalness={0.3}
                    roughness={0.1}
                    color={deskConfig.frameColor}
                />
            </mesh>
            <mesh geometry={nodes.ClassicStand2.geometry} scale={[1, 1, 1]} position={nodes.ClassicStand2.position}
                visible={deskConfig.frameType === "standard"}>
                <meshStandardMaterial
                    metalness={0.3}
                    roughness={0.1}
                    color={deskConfig.frameColor}
                />
            </mesh>
            {/* 操控面板 */}
            <mesh geometry={nodes.Panel.geometry} scale={[1, 1, 1]} position={nodes.Panel.position}
                visible={deskConfig.electric}>
                <meshStandardMaterial
                    color={deskConfig.frameColor}
                    metalness={0.3}
                    roughness={0.1}
                />
            </mesh>
            {/* 线缆 */}
            <mesh geometry={nodes.Wires.geometry} scale={[1, 1, 1]} position={nodes.Wires.position}
                visible={deskConfig.electric}>
                <meshStandardMaterial
                    color={deskConfig.frameColor}
                    metalness={0.3}
                    roughness={0.1}
                />
            </mesh>
            {/* 横梁 */}
            <mesh geometry={nodes.CrossBeam.geometry} scale={[1, 1, 1]} position={nodes.CrossBeam.position}
                visible={deskConfig.frameType !== "standard"}>
                <meshStandardMaterial
                    color={deskConfig.frameColor}
                    metalness={0.3}
                    roughness={0.1}
                />
            </mesh>

        </group>
    )

}

export default Desk;