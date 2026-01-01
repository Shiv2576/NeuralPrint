import { HTMLAttributes } from "react";

function LogoCloud(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <p className="text-center">Trusted by engineers at</p>
    </div>
  );
}

export default LogoCloud;
