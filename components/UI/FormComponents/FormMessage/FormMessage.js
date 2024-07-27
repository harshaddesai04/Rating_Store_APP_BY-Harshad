import React from "react";
import Link from "next/link";

const FormMessage = (props) => {
  const { header, subtext, routetext, route = "#" } = props;

  return (
    <div className=" message-container flex flex-col justify-center gap-2">
      {header && <div className="text-3xl text-center">{header}</div>}
      {(subtext || routetext) && (
        <div className="text-center text-sm ">
          {subtext && <span>{subtext} </span>}
          {route && (
            <Link className="text-blue-500" href={route}>
              {routetext}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default FormMessage;
