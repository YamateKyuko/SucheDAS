import { paramProps } from "@/app/bus/types";

export default function Layout(props: {
  map: React.ReactNode,
  bustab: React.ReactNode,
  children: React.ReactNode,
} & paramProps) {
  console.log(props);
  return (
    <article>
      {props.map}
      {props.bustab}

      {props.children}
    </article>
  )
}