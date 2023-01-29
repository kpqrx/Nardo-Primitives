import React from "react";

function Button(props: React.PropsWithChildren & { foo?: string }) {
  return <button data-bar={props.foo}>{props.children}</button>;
}

export default Button;
