import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Building() {
  const group = useRef();

  const { scene } = useGLTF(
    "/models/construction_to_completed_building.glb"
  );

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=2500",
        scrub: true,
        pin: true,
      },
    });

    // Rotate while scrolling
    tl.to(group.current.rotation, {
      y: Math.PI,
    });

    // Slight zoom
    tl.to(
      group.current.position,
      {
        z: 1,
      },
      0
    );

    // Final reveal feeling
    tl.to(
      group.current.scale,
      {
        x: 1.15,
        y: 1.15,
        z: 1.15,
      },
      0.6
    );
  }, []);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.3}
      position={[0, -1.5, 0]}
    />
  );
}

export default Building;