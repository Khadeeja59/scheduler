import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => {
      if (replace) {
        const newHistory = [...prev]
        newHistory.pop()
        newHistory.push(newMode)
        return newHistory
      } else {
        return [...prev, newMode]
      }

    })
  }
  const back = (mode) => {  if (history.length > 1) {
    const newHistory = [...history]
    newHistory.pop()
    const backMode = newHistory[newHistory.length - 1]
    setMode(backMode)
    setHistory(newHistory)
  }
 }
    return { mode, transition, back};
}