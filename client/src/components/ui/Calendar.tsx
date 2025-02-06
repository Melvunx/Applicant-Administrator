import Pikaday from "pikaday";
import { useEffect, useRef } from "react";

export default function Calendar() {
  const myDatepicker = useRef(null);

  useEffect(() => {
    const picker = new Pikaday({
      field: myDatepicker.current,
    });
    return () => picker.destroy();
  }, []);

  return (
    <input
      type="text"
      className="input pika-single"
      defaultValue="Pick a date"
      ref={myDatepicker}
    />
  );
}
