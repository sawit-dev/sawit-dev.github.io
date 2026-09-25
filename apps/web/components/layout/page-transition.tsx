import { useNavigation } from "react-router"

export function PageTransition() {
  const navigation = useNavigation()
  const isNavigating = navigation.state !== "idle"

  return (
    <div
      aria-hidden={!isNavigating}
      aria-label="Loading page"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary transition-opacity duration-300 ${isNavigating ? "opacity-100" : "opacity-0"}`}
      role="status"
    >
      <span className="block h-full w-1/3 animate-[route-progress_1.2s_ease-in-out_infinite] bg-primary-foreground/80" />
    </div>
  )
}
