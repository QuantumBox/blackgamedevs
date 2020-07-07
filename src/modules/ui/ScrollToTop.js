import React, { useEffect, useState } from "react"

import Sticky from "react-sticky-el"
import { Image } from "theme-ui"

import backToTopIcon from "@public/back-to-top.svg"

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false) 
  const [shouldStick, setShouldStick] = useState(true); //<- Disable sticky on mobile. It doesn't look good.

  const onScroll = () => {
    if (window.scrollY >= 364) {
      setVisible(true)
    } else {
      setVisible(false)
    }

    //If on mobile, disable sticky for this. 
    //Else, enable sticky.
    //NOTE(Rejon): This is purely cosmetic. 
    if (window.innerWidth <= 650 && shouldStick) {
      setShouldStick(false);
    }
    else if (window.innerWidth > 650 && !shouldStick){
      setShouldStick(true);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined')
    {
      window.addEventListener("scroll", onScroll)

      return () => {
        window.removeEventListener("scroll", onScroll)
      }
    }
    
  }, [])

  return (
    <Sticky mode="bottom" disabled={!shouldStick}>
      <Image
        src={backToTopIcon}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        alt="Back to top icon"
        aria-label="Back to top icon"
        sx={{
          cursor: "pointer",
          filter: "invert(80%)",
          position: "fixed",
          width: "3.32rem",
          right: ['0', '0', "-5rem"],
          bottom: visible ? "12px" : "0px",
          opacity: visible ? "1" : "0",
          pointerEvents: visible ? "initial" : "none",
          transition: "all .164s ease-in-out",
        }}
      />
    </Sticky>
  )
}

export default ScrollToTop
