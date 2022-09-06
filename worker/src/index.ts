import { mods } from "../../src/utils/mods";

export interface Env {}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname.startsWith("/v1/mods")) {
      return new Response(JSON.stringify(mods));
    }

    return Response.redirect("https://jacksta.dev/", 302);
  },
};
