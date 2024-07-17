import { redirect } from "next/navigation"
import { routes } from "./constants/routes"

export default function Home() {
  return redirect(routes.landing)
}