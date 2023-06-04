// learn more: https://fly.io/docs/reference/configuration/#services-http_checks
import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  return new Response("OK");
};
