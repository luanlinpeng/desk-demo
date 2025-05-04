import { OrbitControls } from "@react-three/drei";
import { Stage } from "@react-three/drei";
import Desk from "./Desk";
const Experience = () => {


    return <>
    <Stage 
    shadows={false}>
        
        <Desk />
    </Stage>
    <OrbitControls />
    </>
}

export default Experience;