import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/he")({
  component: HebrewLayout,
});

function HebrewLayout() {
  return <Outlet />;
}