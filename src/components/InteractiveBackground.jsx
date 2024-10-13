// InteractiveBackground.jsx
import React, { useEffect, useRef } from "react";
import "../assets/style/interactivebck.css"
const InteractiveBackground = () => {
  const interactiveRef = useRef(null); //crea una referencia que se va a asignar a un elemento del DOM = va a cambiar su posición basada en el movimiento del mouse

  useEffect(() => {
    // se ejecuta después de montarse el componente

    //variables para manejar las posiciones actual y objetivo
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
      //actualiza la posición actual --> hacia posición objetivo. Finalmente, aplica la posición al nuevo elemento actual (efecto de seguimiento)
      if (interactiveRef.current) {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interactiveRef.current.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
      }
    };

    const updateTarget = (event) => {
      //determina hacia dónde tiene que moverse el elemento interactivo
      tgX = event.clientX - window.innerWidth / 20;
      tgY = event.clientY - window.innerHeight / 20;
    };

    window.addEventListener("mousemove", updateTarget);
    move();

    return () => {
      window.removeEventListener("mousemove", updateTarget);
    };
  }, []);

  return (
    <div className="gradient-bg">
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        {" "}
        {/* estilos de fondo de gradientes*/}
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div> 
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive" ref={interactiveRef}></div>{" "}
        {/* div interactivo -> su posición se actualiza en respuesta al movimiento del mouse*/}
      </div>
    </div>
  );
};

export default InteractiveBackground;
