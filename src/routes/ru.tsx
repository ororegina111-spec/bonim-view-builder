import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ru")({
  component: RussianLayout,
});

function RussianLayout() {
  return <Outlet />;
}
